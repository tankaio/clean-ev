<template>
  <div class="home">
    <v-header title="首页" :isArrow="true"></v-header>
  </div>
</template>

<script>
// @ is an alias to /src
import VHeader from "../components/v-header.vue";
export default {
  name: "home",
  components: {
    VHeader
  }
};
</script>
