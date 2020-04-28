<template>
  <div class="v-single-check" @click="clickHandler">
    <div class="outer">
      <div class="inner" v-show="value"></div>
    </div>
  </div>
</template>

<script>
export default {
  // model: {
  //   prop: "checked",
  // event: "click"
  // },
  props: {
    value: Boolean
  },
  methods: {
    clickHandler() {
      this.$emit("input", !this.value);
      this.$emit("change", !this.value);
    }
  }
};
</script>

<style lang="scss">
.v-single-check {
  display: inline-block;
  vertical-align: middle;
  .outer {
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $normalColTwo;
    border-radius: 50%;
    // box-sizing: border-box;
  }
  .inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $weakColFour;
  }
}
</style>
