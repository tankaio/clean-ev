<template>
  <div class="v-header">
    <div class="leftwarp" @click="leftClick">
      <i class="iconfont icon-backarrow" v-if="isArrow"></i>
      <span v-else>{{leftTxt}}</span>
    </div>
    <div>{{title}}</div>
    <div class="rightwrap" @click="rightClick">
      <slot></slot>
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
    isArrow: Boolean
  },
  methods: {
    leftClick() {
      
    }
  }
};
</script>

<style lang="scss">
.v-header {
  height: 44px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  background-color: $impColTwo;
  color: $white;
  font-size: $fsLarge;
  padding: 0 15px;
  .icon-backarrow {
    font-size: $fsMiddle;
  }
  .rightwrap,
  .leftwarp {
    min-width: 18px;
    min-height: 18px;
    font-size: $fsMiddle;
  }
}
</style>