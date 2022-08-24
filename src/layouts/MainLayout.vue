<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CircleImg from './CircleImg.vue';

const router = useRouter();

const profiles = ref(null);
const profilesLen = ref(0);

async function fetchProfile() {
  const res = await fetch(
    'https://vueproject-8c9fd-default-rtdb.firebaseio.com/story.json'
  );
  const data = await res.json();
  profiles.value = data;
  profilesLen.value = Object.keys(data).length;
  console.log(data);
}

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <section class="main-wrapper">
    <header class="header row">
      <img src="images/logo.png" alt="logo" />
      <q-icon
        class="notification-icon"
        name="notifications_none"
        size="27.44px"
        @click="router.push('/story/1')"
      />
    </header>
    <div class="circle-content-wrapper row">
      <CircleImg
        v-for="profile in profiles"
        :key="profile.id"
        v-bind="profile"
        :profileLen="profilesLen"
      />
    </div>

    <q-card class="circle-card q-mt-md q-pd-lg">
      <q-card-section class="column no-wrap circle-card-section">
        <q-icon name="wallet" size="42px" />
        <div class="circle-card-title">Wallet Watch 👀</div>
        <div class="feature-img-wrapper row flex-center">
          <q-img
            class="circle-card-img q-mt-md"
            src="https://trippy.place/img/img-push.963babe8.png"
            alt="card image"
            no-spinner
          />
        </div>
        <p class="circle-card-desc">
          Want to get APP PUSH notifications for your wallet activities? Want to
          follow the whales? Track any wallet’s latest activities including
          mints, buys and sells.
        </p>
        <q-btn
          unelevated
          rounded
          label="Watch Now >"
          class="circle-card-btn q-mt-md"
          ref="button"
          @click="() => navigate('/')"
        />
      </q-card-section>
    </q-card>
    <img
      src="https://pub.angelleague.io/2022/06/29/1656485183_testImg.png"
      alt=""
    />
  </section>
</template>

<style lang="scss">
@media only screen and (max-width: 800px) {
  .main-wrapper {
    max-width: 800px im !important;
  }
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 475px;
  height: 100vh;
  margin: 0 auto;
  background-color: black;
  overflow: auto;

  .header {
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
    height: 60px;

    img {
      width: 165px;
      height: 32px;
    }

    .notification-icon {
      color: white;
    }
  }

  .circle-content-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    min-height: 90px;
    max-width: 475px;
    padding: 1rem;
    margin-bottom: 1rem;
    overflow-x: auto;
  }
}

.circle-card {
  position: relative;
  width: 90%;
  max-width: 475px;
  margin: 0 auto 2rem auto;
  padding-bottom: 2rem;
  background: linear-gradient(
    111.49deg,
    rgba(224, 224, 224, 0.24) -8.95%,
    rgba(227, 227, 227, 0.15) 114%
  );
  border-radius: 25px;
  background-image: url('https://t4.ftcdn.net/jpg/04/91/94/07/240_F_491940770_ETcZHfu6eiI2ygQVwI6oXHFC28UH58PI.jpg');
  background-size: cover;

  .circle-card-section {
    color: white;

    .circle-card-title {
      font-weight: 700;
      font-size: 30px;
    }

    .circle-card-desc {
      margin: 0;
      font-size: 14px;
    }

    .feature-img-wrapper {
      width: 100%;
      margin: 0.5rem auto;
      border-radius: 10px;

      .circle-card-img {
        width: 100%;
        max-height: 250px;
        margin: 0;
      }
    }

    .circle-card-btn {
      width: 100%;
      height: 3rem;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 40px;
    }
  }
}

.circle-content-wrapper {
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
}

.circle-content-wrapper::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}
</style>
