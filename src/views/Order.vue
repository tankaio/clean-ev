<template>
  <div class="order">
    <v-header title="下单">
      <router-link to="/cart">
        <van-icon name="shopping-cart-o" />
      </router-link>
    </v-header>
    <v-search v-model="value" @search="search">
      <div class="qr-code"><van-icon name="scan" /></div>
    </v-search>
    <ul class="navBar">
      <li
        v-for="(item, index) in navBar"
        :key="index"
        :class="{ active: navAcIndex === index }"
        @click="navbarClick(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="bread-wrap">
      <span class="fl">?/{{ totalCount }}</span>
      <div class="fr">
        <span class="bread">洗护/食品/宝洁</span>
        <van-icon name="filter-o" @click="show = true" />
      </div>
    </div>
    <van-popup v-model="show" position="right" :style="{ height: '100%' }">
      <div class="tags">
        <van-tag type="success" class="ml" @click="xihuClick">洗护</van-tag>
        <van-tag type="success" class="ml" @click="shipinClick">食品</van-tag>
        <van-tag type="success" class="ml" @click="baojieClick">宝洁</van-tag>
      </div>
    </van-popup>
    <div class="line-1"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <v-goods-item
        v-for="item in goodsListLocal"
        :key="item.id"
        :src="item.img"
        :title="item.title"
        :serial="item.serial"
        :packageDimensions="item.packageDimensions"
        :monery="item.monery"
        :number="item.number"
        @click="$router.push(`/goodsselect/${item.id}`)"
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
import { List, Popup, Tag } from "vant";

Vue.use(List)
  .use(Popup)
  .use(Tag);
export default {
  components: {
    VHeader,
    VSearch,
    VGoodsItem
  },
  data() {
    return {
      navBar: ["全部", "促销", "PUKU-N", "PUKU-Y", "PUKU-Z"],
      navAcIndex: 0,
      loading: false,
      finished: false,
      page: 1,
      show: false,
      totalCount: 0,
      goodsListLocal: [],
      type: "",
      value: ""
    };
  },
  computed: {
    ...mapState("goods", ["goodsList", "salesList", "typeGoodsList"])
  },
  methods: {
    ...mapMutations("goods", ["setGoodsList", "appendGoodsList", "onSalesList", "setTypeGoodsList"]),
    search() {
      getGoods(1, 15, this.value).then(res => {
        console.log("search_goodsList:", res);
      });
    },
    onLoad() {
      getGoods(this.page, 15).then(res => {
        console.log("onLoad_res:", res);
        this.appendGoodsList(res.data);
        this.page++;
        if (this.navAcIndex === 1) {
          this.onSalesList();
          this.goodsListLocal = this.salesList;
          console.log("sales:", this.goodsListLocal);
        }
        if (this.type === "洗护") {
          this.setTypeGoodsList("洗护");
          this.goodsListLocal = this.typeGoodsList;
          console.log("xihu_onLoad:", this.goodsListLocal);
        }
        if (this.type === "食品") {
          this.setTypeGoodsList("食品");
          this.goodsListLocal = this.typeGoodsList;
          console.log("shipin_onLoad:", this.goodsListLocal);
        }
        if (this.type === "宝洁") {
          this.setTypeGoodsList("宝洁");
          this.goodsListLocal = this.typeGoodsList;
          console.log("baojie_onLoad:", this.goodsListLocal);
        }
        this.loading = false;
        if (res.data.length < 1) this.finished = true;
      });
    },
    navbarClick(index) {
      this.navAcIndex = index;
      if (index === 0) {
        this.goodsListLocal = this.goodsList;
        console.log("all:", this.goodsListLocal);
      }
      if (index === 1) {
        this.onSalesList();
        this.goodsListLocal = this.salesList;
        console.log("sales:", this.goodsListLocal);
      }
    },
    xihuClick() {
      this.type = "洗护";
      this.setTypeGoodsList("洗护");
      this.goodsListLocal = this.typeGoodsList;
      console.log("xihu:", this.goodsListLocal);
      this.show = false;
    },
    shipinClick() {
      this.type = "食品";
      this.setTypeGoodsList("食品");
      this.goodsListLocal = this.typeGoodsList;
      console.log("shipin:", this.goodsListLocal);
      this.show = false;
    },
    baojieClick() {
      this.type = "宝洁";
      this.setTypeGoodsList("宝洁");
      this.goodsListLocal = this.typeGoodsList;
      console.log("baojie:", this.goodsListLocal);
      this.show = false;
    }
  },
  created() {
    getGoods(this.page, 15).then(res => {
      console.log("created_res:", res);
      this.setGoodsList(res.data);
      this.goodsListLocal = this.goodsList;
      this.totalCount = res.headers["x-total-count"];
      this.page++;
    });
  }
};
</script>

<style lang="scss" scoped>
.order {
  .van-icon-shopping-cart-o {
    font-size: $fs_16;
    vertical-align: middle;
    color: $white;
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
  .tags {
    width: 150px;
    padding: 10px;
    .ml {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .van-icon-filter-o {
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
