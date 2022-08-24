<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const slide = ref(0);
const slideData = ref(null);
const activePageIndex = ref(0);
const duration = ref(5000);
const modifiedDuration = ref(0);
const currentPercentage = ref(0);
const pausePercentage = ref(0);
const progressbarTimer = ref(0);
const slideTimer = ref(0);
const mouseEventTime = ref({
  mousedown: 0,
  mouseup: 0,
});

// const calculatedPath = computed(() => {
//   return route.params.id;
// });

async function fetchData() {
  const res = await fetch(
    `https://vueproject-8c9fd-default-rtdb.firebaseio.com/story/${route.params.id}.json`
  );
  const data = await res.json();
  slideData.value = data;
}

function goToNextPage(path) {
  router.push({ path });
}

function playProgressbar() {
  const initialTime = new Date().getTime();
  progressbarTimer.value = setInterval(() => {
    let currentTime = new Date().getTime();

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

function slideRightClick() {
  if (slide.value === slideData.value.list.length - 1) {
    goToNextPage(`/story/${slideData.value.id + 1}`);
    if (slideData.value.id + 1 === 2) {
      goToNextPage('/');
    }
  }
  slide.value += 1;
  reset();
}

function slideLeftClick() {
  if (slide.value === 0) {
    goToNextPage(`/story/${slideData.value.id - 1}`);
    if (slideData.value.id === 0) {
      goToNextPage('/');
    }
  }
  slide.value -= 1;
  reset();
}

// function slideByClick({ clientX }) {
//   if (clientX >= window.innerWidth / 2) {
//     if (slide.value === slideData.value.list.length - 1) {
//       goToNextPage(`/story/${slideData.value.id + 1}`);
//       if (slideData.value.id + 1 === 2) {
//         goToNextPage('/');
//       }
//     } else {
//       slide.value += 1;
//       reset();
//     }
//   } else if (slide.value > 0 && clientX < window.innerWidth / 2) {
//     slide.value -= 1;
//     reset();
//   } else if (slide.value === 0 && clientX < window.innerWidth / 2) {
//     playProgressbar();
//   }
// }

function autoSlide() {
  if (slide.value === slideData.value.list.length - 1) {
    goToNextPage(`/story/${slideData.value.id + 1}`);
    if (slideData.value.id + 1 === 2) {
      goToNextPage('/');
    }
    slide.value += 1;
  }

  if (slide.value < slideData.value.list.length - 1) {
    slide.value += 1;
  }
  reset();
}

function holdHandler(link, event) {
  const { type, timeStamp } = event;
  if (type === 'mousedown') {
    mouseEventTime.value.mousedown = timeStamp;
    pausePercentage.value = currentPercentage.value;
    clearInterval(progressbarTimer.value);
    clearInterval(slideTimer.value);
    modifiedDuration.value =
      duration.value - (pausePercentage.value * duration.value) / 100;
  }

  if (type === 'mouseup') {
    mouseEventTime.value.mouseup = timeStamp;

    if (
      mouseEventTime.value.mouseup - mouseEventTime.value.mousedown < 150 &&
      link
    ) {
      window.open(link, '_self');
      return;
    }
    playProgressbar();
  }
}

function reset() {
  currentPercentage.value = 0;
  modifiedDuration.value = 0;
  pausePercentage.value = 0;
  clearInterval(progressbarTimer.value);
  clearInterval(slideTimer.value);
}

onMounted(() => {
  fetchData();
  playProgressbar();
  localStorage.setItem(`isActive${route.params.id}`, true);
});

watch(slide, (newSlide) => {
  activePageIndex.value = newSlide;
  reset();
  playProgressbar();
});

// watch(route, () => {
//   window.location.reload();
// });
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
    <div class="story-close" @click="goToNextPage('/')">
      <q-icon name="close" size="24px" />
    </div>
    <div class="left-arrow" @click="slideLeftClick">
      <q-icon name="chevron_left" size="32px" />
    </div>
    <div class="right-arrow" @click="slideRightClick">
      <q-icon name="chevron_right" size="32px" />
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="story-carousel-wrapper"
    >
      <q-carousel-slide
        class="story-carousel"
        v-for="(image, i) in slideData?.list"
        :key="i"
        :name="i"
        @mousedown="holdHandler(image.link, $event)"
        @mouseup="holdHandler(image.link, $event)"
      >
        <img
          class="carousel-image"
          :src="image.images"
          alt=""
          draggable="false"
        />
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<style lang="scss">
@media only screen and (max-width: 475px) {
  .trippy-stroy-wrapper {
    max-width: 360px;
  }
}

.trippy-stroy-wrapper {
  position: relative;
  width: 475px;
  height: 100vh;
  margin: 0 auto;

  .left-arrow {
    position: absolute;
    top: 50vh;
    left: 0;
    color: white;
    z-index: 1;
    border-radius: 50%;

    &:hover {
      background-color: rgb(20, 20, 21, 0.3);
    }
  }

  .right-arrow {
    position: absolute;
    top: 50vh;
    right: 0;
    color: white;
    z-index: 1;
    border-radius: 50%;

    &:hover {
      background-color: rgb(20, 20, 21, 0.3);
    }
  }

  .story-close {
    position: absolute;
    color: white;
    right: 0;
    top: 0;
    z-index: 10;
  }

  .indicator-wrapper {
    position: absolute;
    display: flex;
    width: 100%;
    height: 30px;
    z-index: 2;
    background: linear-gradient(180deg, #141415 0%, rgba(20, 20, 21, 0) 100%);

    .indicator-background {
      background-color: rgba(217, 222, 232, 0.3);
      margin-left: 4px;
      height: 3px;

      .indicator {
        background-color: rgb(217, 222, 232);
        height: 3px;
      }

      &:first-child {
        margin-left: 8px;
      }

      &:last-child {
        margin-right: 8px;
      }
    }
  }

  .story-carousel-wrapper {
    width: 100%;
    height: 100%;

    .story-carousel {
      padding: 0;

      .carousel-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
