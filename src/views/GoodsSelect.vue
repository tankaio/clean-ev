<template>
  <div class="goods-select">
    <div class="body">
      <v-header title="产品选择">
        <router-link to="/cart">
          <van-icon name="shopping-cart-o" />
        </router-link>
      </v-header>
      <v-goods-item
        :src="goodItem.img"
        :title="goodItem.title"
        :serial="goodItem.serial"
        :packageDimensions="goodItem.packageDimensions"
        :monery="goodItem.monery"
        :inventoryIsShow="false"
      ></v-goods-item>
      <van-cell-group>
        <van-cell title="仓库" :value="curWareHouse.reponame" is-link />
        <van-cell title="库存" :value="goodItem.number" />
        <van-cell title="数量">
          <div class="choose-count_wrap">
            <a href="javascript:;" class="count-icon" @click="changeCount(-1)">-</a>
            <input type="text" class="inp ml" v-model.number="goodsCount" />
            <a href="javascript:;" class="count-icon ml" @click="changeCount(1)">+</a>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <v-tabbar :itemList="itemList" color="#10903d" @click="clickHandle"></v-tabbar>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import VGoodsItem from "../components/v-goods-item";
import VTabbar from "../components/v-tabbar";
import { getWareHouse } from "../api/goods";
import Vue from "vue";
import { Cell, CellGroup, Toast } from "vant";

Vue.use(Cell).use(CellGroup);
export default {
  components: {
    VHeader,
    VGoodsItem,
    VTabbar
  },
  data() {
    return {
      goodItem: {},
      goodsCount: 1,
      curWareHouse: {},
      itemList: ["取消", "加入购物车"]
    };
  },
  methods: {
    changeCount(num) {
      this.goodsCount += num;
      if (this.goodsCount < 1) this.goodsCount = 1;
      if (this.goodsCount > this.goodItem.number) this.goodsCount = this.goodItem.number;
    },
    clickHandle(index) {
      // this.$router.push({ path: "/order", replace: true })也可
      if (index === 0) this.$router.replace("/order");
      if (index === 1) {
        let shopCart = {
          shopId: this.$store.state.shop.curShop.id,
          shopName: this.$store.state.shop.curShop.name,
          shopChecked: false,
          goodsInfo: this.$store.state.goods.goodItem,
          count: this.goodsCount,
          remark: "",
          warehouseId: this.curWareHouse.id,
          warehouseName: this.curWareHouse.reponame,
          goodsChecked: false
        };
        this.$store.commit("goods/addShopCart", shopCart);
        Toast.success("加入购物车成功");
      }
    }
  },
  created() {
    this.$store.commit("goods/setGoodItem", this.$route.params.id);
    this.goodItem = this.$store.state.goods.goodItem;
    console.log(this.goodItem);
    getWareHouse().then(res => {
      console.log("res_warehouse:", res);
      this.$store.commit("goods/setWareHouse", res.data);
      this.curWareHouse = this.$store.state.goods.wareHouse.find(item => item.id == this.goodItem.warehouseId);
      console.log(this.curWareHouse);
    });
  }
};
</script>

<style lang="scss" scoped>
.goods-select {
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
  }
  .v-goods-item {
    margin-left: 0;
    padding: 10px 14px;
  }
  .van-cell {
    padding: 20px 14px;
    .van-cell__title {
      color: $black;
      font-size: $fs_16;
    }
    .van-cell__value {
      font-size: $fsSmall;
      color: $black;
    }
    .van-cell__right-icon {
      color: $black;
      font-size: $fsLarge;
    }
  }
  .van-icon-shopping-cart-o {
    font-size: $fs_16;
    vertical-align: middle;
    color: $white;
  }
  .choose-count_wrap {
    display: flex;
    justify-content: flex-end;
    .count-icon {
      width: 23px;
      height: 23px;
      line-height: 23px;
      border: 1px solid $normalColTwo;
      text-align: center;
      color: $black;
      box-sizing: border-box;
    }
    .inp {
      width: 45px;
      height: 23px;
      border: 1px solid $normalColTwo;
      box-sizing: border-box;
      text-align: center;
    }
    .ml {
      margin-left: 7px;
    }
  }
  .v-tabbar {
    /deep/.item:first-child {
      color: $weakColThree !important;
    }
  }
}
</style>
