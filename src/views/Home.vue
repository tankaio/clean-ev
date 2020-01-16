<template>
  <div class="home">
    <v-header title="首页" :isArrow="true"></v-header>
    <div class="pies">
      <div class="test">test</div>
      <v-pie title="月时间进度"></v-pie>
      <v-pie title="月时间进度"></v-pie>
      <v-pie title="月时间进度"></v-pie>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VHeader from "../components/v-header.vue";
import VPie from "../components/v-pie.vue";
export default {
  name: "home",
  components: {
    VHeader,
    VPie
  }
};
</script>

<style>
/* html,
body,
#app {
  height: 100%;
} */
</style>
<style lang="scss" scoped>
.home {
  .pies {
    display: flex;
    justify-content: space-around;
    margin-top: 45px;
    .test{
      color: green;
    }
  }
}
</style>
