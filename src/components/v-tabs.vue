<template>
  <div class="v-tabs">
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="activeIndex = index"
      >
        {{ item }}
      </div>
    </div>
    <div class="content-wrap">
      <div class="content" :class="{ display: activeIndex === index }" v-for="(item, index) in tabList" :key="index">
        <slot :name="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-tabs",
  props: {
    tabList: Array
  },
  data() {
    return {
      activeIndex: 0
    };
  }
};
</script>

<style lang="scss">
.v-tabs {
  .tabs {
    display: flex;
    .tab-item {
      flex: 1;
      height: 54px;
      line-height: 54px;
      text-align: center;
      background-color: $weakColOne;
      border-right: 1px solid #efefef;
      border-bottom: 1px solid $weakColTwo;
      box-sizing: border-box;
      font-size: $fsMiddle;
      &:last-child {
        border-right: none;
      }
      &.active {
        background-color: $white;
        border-bottom: 3px solid $impColOne;
      }
    }
  }
  .content {
    display: none;
  }
  .display {
    display: block;
  }
}
</style>
