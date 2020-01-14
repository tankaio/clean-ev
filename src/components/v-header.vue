<template>
  <div class="v-header">
    <div>
      <i class="iconfont icon-backarrow" v-if="isArrow"></i>
      <span v-else>{{leftTxt}}</span>
    </div>
    <div>{{title}}</div>
    <div>
      <slot>
          <span>bj</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-header",
  props: {
    title: {
      type: String,
      required: true
    },
    leftTxt: String,
    isArrow: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
.v-header {
//   width: 100%;
  height: 44px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  background-color: $impColTwo;
}
</style>