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
    `https://vueprj-73cb3-default-rtdb.firebaseio.com//story.json`
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
  reset();
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

  setTimeout(() => {
    isSliding.value = false;
  }, 300);

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
      isSliding.value = false;
      return;
    }
    goToNextPage(`/story/${slideData.value.id - 1}`);
  }
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
  } else if (direction === "right" && distance.x > 150 && isFinal) {
    if (slideDataIndex.value === 0) {
      return;
    }
    goToNextPage(`/story/${slideData.value.id - 1}`);
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

function swipeToClose({ distance, isFinal }) {
  if (distance.y > SWIPELIMIT_CLOSEMODAL && isFinal) {
    goToNextPage("/");
  }
}

function pauseHandler() {
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
    <div class="guides-pause" @click="pauseHandler">
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
        v-touch-pan.down="swipeToClose"
      >
        <div class="carousel-background">
          <h2 class="carousel-title">
            {{ `# ${slideDataIndex + 1} Story ${i + 1} Page` }}
          </h2>
          <h2 class="carousel-subTitle">[주요 기능]</h2>
          <p class="carousel-content">
            1. auto slide 기능<br />
            - 자동 슬라이드 및 상단 인디케이터 바<br />
            - 자동 슬라이드 멈춤 버튼 적용<br /><br />
            2. 클릭 및 스와이프 기능<br />
            - 좌우 클릭 시 다음 페이지로 이동<br />
            - 좌우 스와이프 시 다음 스토리로 이동 (모바일에서 확인 가능)<br />
            - 첫 스토리의 첫 페이지에서는 이전 페이지로 돌아가지 않고,<br />
            마지막 스토리의 마지막 페이지에서는 메인으로 돌아가도록 구현<br /><br />
            3. close 기능 - 우측 상단 x 버튼을 누르거나, <br />
            화면을 아래로 스와이프 시 메인 페이지로 이동<br /><br />
            4. 기타 구현 사항<br />
            - 각 스토리, 페이지는 하나의 컴포넌트로 구현하였으며, <br />
            - 서버에 저장된 데이터 수에 따라 자동으로 렌더링 됨
          </p>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<style lang="scss">
@media only screen and (max-width: 475px) {
  .trippy-stroy-wrapper {
    max-width: 360px;
  }

  .carousel-background {
    width: 360px;
  }
}

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

        .carousel-title {
          padding: 50px 15px 0 15px;
          color: rgb(18, 48, 116);
          font-size: 20px;
          font-weight: bold;
        }

        .carousel-subTitle {
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
        }

        .carousel-content {
          padding: 15px;
          color: rgb(73, 73, 73);
          font-size: 16px;
          font-weight: bold;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
