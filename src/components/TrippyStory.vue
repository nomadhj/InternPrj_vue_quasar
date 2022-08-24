<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const slide = ref(0);
const slideData = ref();
const slideDataIndex = ref();
const activePageIndex = ref(0);
const duration = ref(5000);
const modifiedDuration = ref(0);
const currentPercentage = ref(0);
const pausePercentage = ref(0);
const progressbarTimer = ref(0);
const slideTimer = ref(0);
const isPause = ref(false);
const isSliding = ref(false);
const numOfTotalPages = ref(0);

async function fetchData(id) {
  const res = await fetch(
    `https://vueproject-8c9fd-default-rtdb.firebaseio.com/story.json`
  );
  const data = await res.json();
  const targetItem = data.find((datum) => datum.id === +id);
  const targetItemIndex = data.indexOf(targetItem);
  numOfTotalPages.value = data.length;
  slideData.value = targetItem;
  slideDataIndex.value = targetItemIndex;
}

function goToNextPage(path) {
  router.push({ path });
}

function playProgressbar() {
  const initialTime = Date.now();
  progressbarTimer.value = setInterval(() => {
    let currentTime = Date.now();

    if (modifiedDuration.value > 0) {
      currentPercentage.value =
        pausePercentage.value +
        Math.floor(((currentTime - initialTime) / duration.value) * 100);
    } else {
      currentPercentage.value = Math.floor(
        ((currentTime - initialTime) / duration.value) * 100
      );
    }
  }, duration.value / 100);

  if (modifiedDuration.value > 0) {
    slideTimer.value = setInterval(autoSlide, modifiedDuration.value);
  } else {
    slideTimer.value = setInterval(autoSlide, duration.value);
  }
}

function slideByClick({ offsetX }) {
  if (isSliding.value) {
    return;
  }
  if (isPause.value) {
    return;
  }
  isSliding.value = true;
  const guideWidth = document.querySelector(
    ".trippy-stroy-wrapper"
  ).offsetWidth;
  if (offsetX >= guideWidth / 2) {
    if (slide.value === slideData.value.list.length - 1) {
      goToNextPage(`/story/${slideData.value.id + 1}`);
      if (slideDataIndex.value + 1 === numOfTotalPages.value) {
        goToNextPage("/");
      }
    } else {
      slide.value += 1;
    }
  } else if (slide.value > 0 && offsetX < guideWidth / 2) {
    slide.value -= 1;
  } else if (slide.value === 0 && offsetX < guideWidth / 2) {
    if (slideDataIndex.value === 0) {
      setTimeout(() => {
        isSliding.value = false;
      }, 300);
      return;
    }
    goToNextPage(`/story/${slideData.value.id + 1}`);
  }
  reset();
  setTimeout(() => {
    isSliding.value = false;
  }, 300);
}

function slideSwipe(event) {
  const { direction, distance, isFinal } = event;

  if (isPause.value) {
    return;
  }
  if (direction === "left" && distance.x > 150 && isFinal) {
    goToNextPage(`/story/${slideData.value.id + 1}`);
    if (slideDataIndex.value + 1 === numOfTotalPages.value) {
      goToNextPage("/");
    }
    reset();
  } else if (direction === "right" && distance.x > 150 && isFinal) {
    if (slideDataIndex.value === 0) {
      return;
    }
    goToNextPage(`/story/${slideData.value.id - 1}`);
    reset();
  }
}

function autoSlide() {
  if (slide.value === slideData.value.list.length - 1) {
    goToNextPage(`/story/${slideData.value.id + 1}`);
    if (slideDataIndex.value + 1 === numOfTotalPages.value) {
      goToNextPage("/");
    }
    slide.value += 1;
  }
  if (slide.value < slideData.value.list.length - 1) {
    slide.value += 1;
  }
  reset();
}

function holdHandler() {
  if (isPause.value === false) {
    pausePercentage.value = currentPercentage.value;
    clearInterval(progressbarTimer.value);
    clearInterval(slideTimer.value);
    modifiedDuration.value =
      duration.value - (pausePercentage.value * duration.value) / 100;
  } else {
    playProgressbar();
  }
  isPause.value = !isPause.value;
}

function reset() {
  currentPercentage.value = 0;
  modifiedDuration.value = 0;
  pausePercentage.value = 0;
  clearInterval(progressbarTimer.value);
  clearInterval(slideTimer.value);
}

onMounted(() => {
  fetchData(route.params.id);
  playProgressbar();
  localStorage.setItem(`isActive${route.params.id}`, true);
});

watch(slide, (newSlide) => {
  activePageIndex.value = newSlide;
  reset();
  playProgressbar();
});
</script>

<template>
  <section class="trippy-stroy-wrapper">
    <div class="indicator-wrapper">
      <div
        class="indicator-background"
        v-for="(_, index) in slideData?.list"
        :key="index"
        :style="{ width: `${100 / slideData.list.length}%` }"
      >
        <div
          class="indicator"
          :style="
            index === activePageIndex
              ? `width: ${currentPercentage}%`
              : activePageIndex > index
              ? `width:100%`
              : `width:0%`
          "
        />
      </div>
    </div>
    <div class="guides-gradient" />
    <div class="guides-close" @click="goToNextPage('/')">
      <q-icon name="close" size="36px" />
    </div>
    <div class="guides-pause" @click="holdHandler">
      <!-- 호출을 하는게 맞는지, 포인터만 넘기는게 맞는지? -->
      <q-icon v-if="isPause" name="play_arrow" size="36px" />
      <q-icon v-else name="pause" size="36px" />
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="guides-carousel-wrapper"
      @click="slideByClick($event)"
    >
      <q-carousel-slide
        class="guides-carousel"
        v-for="(_, i) in slideData?.list"
        :key="i"
        :name="i"
        v-touch-pan.left.right="slideSwipe"
      >
        <div class="carousel-background">
          <p class="carousel-content">[주요 기능]</p>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<style lang="scss">
/* @media only screen and (max-width: 475px) {
  .trippy-stroy-wrapper {
    max-width: 360px;
  }

  .carousel-background {
    width: 360px;
  }
} */

.trippy-stroy-wrapper {
  position: relative;
  width: 475px;
  height: 100vh;
  margin: 0 auto;

  .indicator-wrapper {
    position: absolute;
    display: flex;
    top: 15px;
    width: 100%;
    height: 30px;
    z-index: 9;

    .indicator-background {
      background-color: rgba(217, 222, 232, 0.3);
      margin-left: 4px;
      height: 3px;
      border-radius: 2px;

      .indicator {
        background-color: rgb(217, 222, 232);
        height: 3px;
        border-radius: 1px;
      }

      &:first-child {
        margin-left: 8px;
      }

      &:last-child {
        margin-right: 8px;
      }
    }
  }

  .guides-gradient {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(180deg, #141415 0%, rgba(20, 20, 21, 0) 100%);
    z-index: 5;
  }

  .guides-close {
    position: absolute;
    color: white;
    right: 0;
    top: 15px;
    margin: 8px 16px;
    z-index: 10;
  }

  .guides-pause {
    position: absolute;
    color: white;
    right: 50px;
    top: 15px;
    margin: 8px 16px;
    z-index: 10;
  }

  .guides-carousel-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: black;

    .guides-carousel {
      padding: 0;

      .carousel-background {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("../assets/css/background.png");

        .carousel-content {
          padding: 50px 15px;
        }
      }
    }
  }
}
</style>
