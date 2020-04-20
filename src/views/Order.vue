<template>
  <div class="order">
    <v-header title="下单"><van-icon name="shopping-cart-o"/></v-header>
    <v-search>
      <div class="qr-code"><van-icon name="scan" /></div>
    </v-search>
    <ul class="navBar">
      <li
        v-for="(item, index) in navBar"
        :key="index"
        :class="{ active: navAcIndex === index }"
        @click="navAcIndex = index"
      >
        {{ item }}
      </li>
    </ul>
    <div class="bread-wrap">
      <span class="fl">1670/3590</span>
      <div class="fr">
        <span class="bread">洗护/食品/宝洁</span>
        <van-icon name="filter-o" />
      </div>
    </div>
    <div class="line-1"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <v-goods-item
        v-for="item in goodsList"
        :key="item.id"
        :img="item.img"
        :title="item.title"
        :serial="item.serial"
        :packageDimensions="item.packageDimensions"
        :monery="item.monery"
        :number="item.number"
      ></v-goods-item>
    </van-list>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import VSearch from "../components/v-search";
import VGoodsItem from "../components/v-goods-item";
import { getGoods } from "../api/goods";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import { List } from "vant";

Vue.use(List);
export default {
  components: {
    VHeader,
    VSearch,
    VGoodsItem
  },
  data() {
    return {
      navBar: ["促销", "全部", "PUKU-N", "PUKU-Y", "PUKU-Z"],
      navAcIndex: 0,
      loading: false,
      finished: false,
      page: 1
    };
  },
  computed: {
    ...mapState("goods", ["goodsList"])
  },
  methods: {
    ...mapMutations("goods", ["setGoodsList", "appendGoodsList"]),
    getGoodsList() {
      return new Promise(resolve => {
        getGoods(this.page, 15).then(res => {
          console.log("goods:", res);
          this.appendGoodsList(res.data);
          this.page++;
          resolve(res.data);
        });
      });
    },
    onLoad() {
      this.getGoodsList().then(resolve => {
        this.loading = false;
        if (resolve.length < 1) this.finished = true;
      });
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="scss" scoped>
.order {
  .van-icon-shopping-cart-o {
    font-size: $fs_16;
    vertical-align: middle;
  }
  .van-icon-scan {
    font-size: 28px;
  }
  padding-top: 44px;
  .v-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
  }
  .v-search {
    background-color: $weakColOne;
    /deep/.inp-search {
      background-color: $weakColOne;
    }
  }
  .qr-code {
    padding: 0 15px;
    margin: 13px 0;
    border-left: 1px solid $weakColTwo;
    display: flex;
    align-items: center;
  }
  .navBar {
    display: flex;
    border-top: 1px solid $weakColTwo;
    border-bottom: 1px solid $weakColTwo;
    background-color: $weakColOne;
    font-size: $fsSmall;
    padding: 8px 0;
    li {
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid $weakColTwo;
      &:last-child {
        border-right: 0 none;
      }
      &.active {
        color: $weakColFour;
      }
    }
  }
  .bread-wrap {
    height: 43px;
    line-height: 43px;
    font-size: $fsSmall;
    color: $normalColTwo;
    padding: 0 15px;
    .fl {
      float: left;
    }
    .fr {
      float: right;
      .bread {
        margin-right: 16px;
      }
    }
  }
  .line-1 {
    height: 1px;
    background-color: $weakColTwo;
    margin: 0 15px;
  }
  .van-icon-filter-o {
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
