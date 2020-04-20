<template>
  <div class="v-search">
    <div class="search-icon-wrap">
      <van-icon name="search" />
    </div>
    <input type="text" class="inp-search" placeholder="点击进行搜索~" />
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.v-search {
  display: flex;
  height: 52px;
  .search-icon-wrap {
    width: 35px;
    line-height: 52px;
    text-align: right;
  }
  .inp-search {
    flex: 1;
    padding-left: 5px;
    border: 0 none;
    font-size: $fsSmall;
  }
  .van-icon-search {
    font-size: $fsMiddle;
  }
}
</style>
