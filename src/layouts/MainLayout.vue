<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CircleImg from "./CircleImg.vue";

const router = useRouter();

const profiles = ref(null);
const profilesLen = ref(0);

async function fetchProfile() {
  const res = await fetch(
    "https://vueprj-73cb3-default-rtdb.firebaseio.com/story.json"
  );
  const data = await res.json();
  profiles.value = data;
  profilesLen.value = Object.keys(data).length;
}

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <section class="main-wrapper">
    <header class="header row">
      <img src="images/logo.png" alt="logo" />
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
      <q-card-section class="circle-card-section column no-wrap">
        <p class="circle-card-desc">프로젝트 메인 페이지입니다.</p>
        <p class="circle-card-desc">
          기업 협업으로 진행 된 프로젝트로<br />
          문제가 될 만한 이미지, 코드는 삭제하였습니다.
        </p>
        <p class="circle-card-desc">
          상기 아이콘을 클릭해서 내용을 확인할 수 있으나,<br />
          실제 앱에 배포 된 기능 중 일부는 삭제하였습니다.<br />
          (모달 관련 기능, 스켈레톤 UI 등)<br />
          전체 기능은 실제 배포 된 앱에서 확인 가능합니다.
        </p>
        <p class="circle-card-desc">
          [주요 기능]<br />
          1 .서버의 데이터 갯수만큼 자동으로<br />
          아이콘 및 페이지가 추가 되는 구조<br />
          (현재 서버에 섹션 3개가 저장되어 3개 아이콘 적용 됨)<br />
          2. 방문한 섹션은 이력을 Local storage에 저장,<br />
          아이콘 주변의 highlight가 사라지도록 구현
        </p>
        <p class="circle-card-desc">
          <a href="https://trippy.place/">실제 App 주소 (click) </a>
        </p>
      </q-card-section>
    </q-card>
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
  background-image: url("../assets/css/main.png");
  background-size: cover;

  .circle-card-section {
    height: 55vh;

    .circle-card-desc {
      margin: 10px;
      color: white;
      font-size: 15px;
      font-weight: bold;
      line-height: 20px;

      a {
        text-decoration: none;
      }
    }
  }
}
</style>
