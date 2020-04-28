<template>
  <div class="v-goods-item" @click="$emit('click')">
    <img :src="src" />
    <div class="goods-wrap">
      <h4>{{ title }}</h4>
      <div class="center-box">
        <span>编码：{{ serial }}</span>
        <span>规格：{{ packageDimensions }}</span>
      </div>
      <div class="bottom-box">
        <span
          >价格：<i class="price">{{ monery && monery.toFixed(2) }}</i></span
        >
        <span v-show="inventoryIsShow">库存：{{ number }}</span>
      </div>
      <div class="refresh-icon"><van-icon name="replay" /></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    title: String,
    serial: [String, Number],
    packageDimensions: String,
    monery: [String, Number],
    number: [String, Number],
    inventoryIsShow: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.v-goods-item {
  border-bottom: 1px solid $weakColTwo;
  display: flex;
  padding: 10px 14px 10px 0;
  margin-left: 14px;
  position: relative;
  img {
    width: 62px;
    height: 62px;
  }
  .goods-wrap {
    margin-left: 14px;
    h4 {
      font-size: $fsMiddle;
    }
    .center-box,
    .bottom-box {
      font-size: $fsSmall;
      color: $normalColTwo;
      span:last-child {
        margin-left: 26px;
      }
    }
    .center-box {
      margin-top: 6px;
    }
    .bottom-box {
      margin-top: 15px;
      span > i {
        color: $weakColThree;
        font-size: $fs_16;
      }
    }
  }
  .refresh-icon {
    position: absolute;
    bottom: 10px;
    right: 14px;
    .van-icon-replay {
      vertical-align: middle;
      font-size: $fsLarge;
      font-weight: bold;
      // color: $normalColTwo;
    }
  }
}
</style>
