<template>
  <div class="home">
    <v-header title="SFA">
      <i class="iconfont icon-person"></i>
    </v-header>
    <div class="pies">
      <div class="pies-title">{{ piesTitle }}</div>
      <div class="pie-wrap">
        <v-pie title="月时间进度" :val="80"></v-pie>
        <v-pie title="月销售完成度" :val="50"></v-pie>
        <v-pie title="有效商店数" :val="30"></v-pie>
      </div>
    </div>
    <!-- <div class="van-hairline--bottom"></div> -->
    <div class="nav-bar">
      <div class="nav van-hairline--surround" v-for="(item, index) in navList" :key="index">
        <router-link :to="item.link">
          <img :src="item.imgUrl" :alt="item.title" />
          <h3>{{ item.title }}</h3>
        </router-link>
      </div>
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
  },
  data() {
    return {
      piesTitle: "2020年4月",
      navList: [
        { imgUrl: require("@/assets/icon/notice@2x.png"), title: "公司通告", link: "/notice" },
        { imgUrl: require("@/assets/icon/shop_visit@2x.png"), title: "进店拜访", link: "/shopvisit" },
        { imgUrl: require("@/assets/icon/phone_order@2x.png"), title: "电话订单", link: "/phoneorder" },
        { imgUrl: require("@/assets/icon/order_status@2x.png"), title: "订单状态", link: "/orderstatus" },
        { imgUrl: require("@/assets/icon/train_ways@2x.png"), title: "培训资料", link: "/trainways" },
        { imgUrl: require("@/assets/icon/mess_center@2x.png"), title: "消息中心", link: "/messcenter" },
        { imgUrl: require("@/assets/icon/add_shop@2x.png"), title: "新增门店", link: "/addshop" },
        { imgUrl: require("@/assets/icon/data_sync@2x.png"), title: "数据同步", link: "/datasync" }
      ]
    };
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .pies {
    padding: 20px 0;
    .pies-title {
      text-align: center;
      font-size: $fsMiddle;
      font-weight: bold;
    }
    .pie-wrap {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  }
  .nav-bar {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    flex-wrap: wrap;
    &::after {
      content: "";
      display: block;
      width: 125px;
      height: 135px;
    }
    .nav {
      flex: 1 1 33%;
      font-size: $fsSmall;
      text-align: center;
      img {
        width: 30px;
        height: 30px;
        margin-top: 35px;
      }
      h3 {
        color: $black;
        font-weight: normal;
        margin-top: 8px;
      }
    }
  }
}
</style>
