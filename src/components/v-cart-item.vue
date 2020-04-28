<template>
  <div class="v-cart-item">
    <div class="cart-head">
      <div>
        <v-single-check v-model="shopChecked" @change="shopChkChange" />
        <span class="shopname">{{ shopName }}</span>
      </div>
      <div class="head-right"><span class="remark">备注：</span><van-icon name="records" /></div>
    </div>
    <div class="cart-body" v-for="item in goods" :key="item.goodsInfo.id">
      <v-single-check v-model="item.goodsChecked" @change="goodsChkChange($event, item.goodsInfo.id)" />
      <div class="goods-info">
        <img :src="item.goodsInfo.img" />
        <div class="info-wrap">
          <h4>{{ item.goodsInfo.title }}</h4>
          <p class="warehouse">选中仓库：{{ item.warehouseName }}</p>
          <div class="cou-pri">
            <span
              >价格：<i class="price">{{ item.goodsInfo.monery }}</i
              >元</span
            >
            <div class="choose-count">
              <a href="javascript:;" @click="changeCount(-1, item.goodsInfo.id)">-</a>
              <input type="text" v-model="item.count" />
              <a href="javascript:;" @click="changeCount(1, item.goodsInfo.id)">+</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSingleCheck from "../components/v-single-check";
export default {
  components: {
    vSingleCheck
  },
  props: {
    shopId: Number,
    shopName: String,
    goods: Array
  },
  data() {
    return {
      shopChecked: false
      // goodsChecked: false
    };
  },
  methods: {
    changeCount(count, goodsId) {
      let payload = { shopId: this.shopId, count: count, goodsId: goodsId };
      this.$store.commit("goods/changeCartCount", payload);
    },
    shopChkChange(checked) {
      let payload = { shopId: this.shopId, shopChecked: checked };
      this.$store.commit("goods/changeShopChecked", payload);
      let totalPrice = 0;
      this.$store.state.goods.shopCart.forEach(elem => {
        elem.goods.forEach(item => {
          if (item.goodsChecked) totalPrice += item.goodsInfo.monery * item.count;
          else this.$emit("cancelAllCheck", false);
        });
      });
      this.$emit("getTotal", totalPrice);
    },
    goodsChkChange(checked, goodsId) {
      let payload = { shopId: this.shopId, goodsChecked: checked, goodsId: goodsId };
      this.$store.commit("goods/changeGoodsChecked", payload);
      let totalPrice = 0;
      this.$store.state.goods.shopCart.forEach(elem => {
        elem.goods.forEach(item => {
          if (item.goodsChecked) totalPrice += item.goodsInfo.monery * item.count;
          else this.$emit("getTotal", totalPrice);
        });
      });
      this.$emit("cancelAllCheck", false);
    }
  }
};
</script>

<style lang="scss">
.v-cart-item {
  .cart-head {
    padding: 15px 14px;
    border-bottom: 1px solid $weakColTwo;
    background-color: $weakColOne;
    display: flex;
    justify-content: space-between;
    font-size: $fsMiddle;
    .shopname {
      margin-left: 14px;
      font-weight: bold;
    }
    .head-right {
      color: $impColOne;
      .remark {
        margin-right: 10px;
      }
      .van-icon-records {
        vertical-align: top;
        font-size: $fs_16;
      }
    }
  }
  .cart-body {
    padding: 15px 14px;
    border-bottom: 1px solid $weakColTwo;
    display: flex;
    align-items: center;
    .goods-info {
      flex: 1;
      margin-left: 14px;
      display: flex;
      img {
        width: 64px;
        height: 64px;
        // float: left;
        border: 1px solid $weakColTwo;
      }
      .info-wrap {
        // float: left;
        flex: 1;
        margin-left: 14px;
        font-size: $fsSmall;
        .warehouse {
          margin-top: 8px;
          color: $normalColTwo;
        }
        .cou-pri {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price {
            color: $weakColThree;
            font-size: $fs_16;
          }
          .choose-count {
            a {
              width: 23px;
              height: 23px;
              line-height: 23px;
              text-align: center;
              display: inline-block;
              border: 1px solid $normalColTwo;
              color: $black;
              box-sizing: border-box;
              &:nth-child(3) {
                margin-left: 8px;
              }
            }
            input {
              width: 44px;
              height: 24px;
              text-align: center;
              padding: 0;
              margin-left: 8px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>
