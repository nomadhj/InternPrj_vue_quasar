<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="route.path"></component>
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s;
}

.slide-enter-from {
  opacity: 0.5;
}

.slide-leave-to {
  opacity: 0;
}
</style>
