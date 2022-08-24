<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const props = defineProps(['id', 'profile_img', 'title', 'proflieLen']);

const router = useRouter();

const isActive = localStorage?.getItem(`isActive${props.id}`);

const moveTo = (link) => {
  router.push(link);
};

onMounted(() => {
  localStorage.getItem(`isActive${props.id}`) ||
    localStorage.setItem(`isActive${props.id}`, false);
});
</script>

<template>
  <div class="circle-wrapper column no-wrap flex-center" @click="() => moveTo(`/story/${id}`)">
    <div class="circle-img-wrapper" :class="{ 'circle-active': isActive === 'true' }">
      <img :src="profile_img" alt="profile image" />
    </div>
    <p class="circle-sub">{{ title }}</p>
  </div>
</template>

<style lang="scss">
.circle-wrapper {
  margin-left: 1rem;

  .circle-img-wrapper {
    width: 42px;
    height: 42px;
    margin-bottom: 5px;
    border: 2px solid #3860e6;
    border-radius: 50%;
    color: white;

    img {
      border: 2px solid black;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .circle-active {
    border: 2px solid #434858 !important;
  }

  .circle-sub {
    margin: 0;
    line-height: 1;
    color: white;
  }
}
</style>
