<template>
  <div class="v-tabbar">
    <div
      class="item"
      v-for="(item, index) in itemList"
      :key="index"
      :style="{ color: color }"
      @click="$emit('click', index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: Array,
    color: String
  }
};
</script>

<style lang="scss">
.v-tabbar {
  display: flex;
  .item {
    flex: 1;
    border-top: 1px solid #ddd;
    font-size: $fsLarge;
    height: 55px;
    line-height: 55px;
    text-align: center;
    &:first-child {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
