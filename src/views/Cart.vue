<template>
  <div class="cart">
    <v-header title="购物车"><span>编辑</span></v-header>
    <v-cart-item
      v-for="item in cart"
      :key="item.shopId"
      :shopId="item.shopId"
      :shopName="item.shopName"
      :goods="item.goods"
      @getTotal="getTotal"
      @cancelAllCheck="cancelAllCheck"
    ></v-cart-item>
    <div class="commit-order">
      <v-single-check v-model="allSelChecked" @change="allChkChange" /><label class="allsel fs_12">全选</label>
      <div class="order-info">
        <span class="total-pri-wrap fs_12"
          >合计：
          <i class="totalPrice">{{ totalPrice }}</i>
          元
        </span>
        <van-button type="primary" class="primary-btn">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import VCartItem from "../components/v-cart-item";
import VSingleCheck from "../components/v-single-check";
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);
export default {
  components: {
    VHeader,
    VCartItem,
    VSingleCheck
  },
  data() {
    return {
      cart: [],
      allSelChecked: false,
      totalPrice: 0
    };
  },
  methods: {
    allChkChange(val) {
      this.$store.state.goods.shopCart.forEach(elem => {
        Vue.set(elem, "shopChecked", val);
        elem.goods.forEach(item => {
          Vue.set(item, "goodsChecked", val);
        });
      });
      if (this.allSelChecked) {
        let totalPrice = 0;
        this.$store.state.goods.shopCart.forEach(elem => {
          elem.goods.forEach(item => {
            totalPrice += item.goodsInfo.monery * item.count;
          });
        });
        this.totalPrice = totalPrice;
      } else {
        this.totalPrice = 0;
      }
    },
    cancelAllCheck(val) {
      this.allSelChecked = false;
    },
    getTotal(val) {
      this.totalPrice = val;
    }
  },
  created() {
    this.cart = this.$store.state.goods.shopCart;
  }
};
</script>

<style lang="scss" scoped>
.cart {
  .commit-order {
    flex: 1;
    padding: 15px 14px;
    border-bottom: 1px solid $weakColTwo;
    display: flex;
    align-items: center;
    .allsel {
      margin-left: 8px;
    }
    .fs_12 {
      font-size: $fsSmall;
    }
    .order-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total-pri-wrap {
        margin-left: 30px;
        > i {
          color: $weakColThree;
          font-size: 14px;
        }
      }
      .primary-btn {
        width: 84px;
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>
