<template>
  <div class="shop-activity">
    <v-header title="店内活动"><span>结束拜访</span></v-header>
    <div class="title-wrap">{{ shopName }}</div>
    <div class="sale-wrap">
      <div class="sale-item">
        <div class="fl">
          <van-icon name="chart-trending-o" />
          <span>本月至今销量</span>
        </div>
        <span>{{ salesData.MonthSales }}</span>
      </div>
      <div class="sale-item">
        <div class="fl">
          <van-icon name="bar-chart-o" />
          <span>过往半年月均销量</span>
        </div>
        <span>{{ salesData.MonthAvgSales }}</span>
      </div>
      <div class="">
        <div class="sale-item">
          <div class="fl">
            <van-icon name="discount" />
            <span>核心分销完成率</span>
          </div>
          <span>{{ salesData.DivSalesPercent }}%</span>
        </div>
      </div>
    </div>
    <div class="remarks">
      <span>历史拜访备注：</span>
    </div>
    <div class="txtarea">
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="点击填写拜访备注~"
        show-word-limit
      />
    </div>
    <router-link to="/order">
      <div class="order-btn btn">下单</div>
    </router-link>
    <router-link :to="`/shopSign/${$route.params.id}`">
      <div class="sign-btn btn">商店签到</div>
    </router-link>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import Vue from "vue";
import { Field } from "vant";
import { getSalesProgress } from "../api/shop";
import { mapMutations, mapState } from "vuex";
Vue.use(Field);
export default {
  components: {
    VHeader
  },
  data() {
    return {
      message: "",
      salesData: {}
    };
  },
  computed: {
    ...mapState("shop", ["shopName"])
  },
  methods: {
    ...mapMutations("shop", ["getShopName", "setCurShop"])
  },
  created() {
    this.getShopName(this.$route.params.id);
    getSalesProgress(this.$route.params.id).then(res => {
      console.log(res);
      this.salesData = res.data;
    });
    this.setCurShop(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.shop-activity {
  .leftwarp {
    width: 36px;
  }
  .title-wrap {
    height: 42px;
    line-height: 42px;
    padding-left: 12px;
    font-size: $fsMiddle;
    font-weight: bold;
    border-bottom: 1px solid $weakColTwo;
    background-color: $weakColOne;
  }
  .sale-wrap {
    font-size: $fsMiddle;
    color: $black;
    .sale-item {
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid $weakColTwo;
      padding-right: 12px;
      margin-left: 12px;
      &:last-child {
        border-bottom: none;
      }
      .fl {
        float: left;
        span {
          margin-left: 12px;
        }
      }
      span {
        float: right;
      }
    }
    .van-icon {
      font-size: $fs_16;
      vertical-align: middle;
    }
  }
  .remarks {
    height: 33px;
    line-height: 33px;
    border-bottom: 1px solid $weakColTwo;
    border-top: 1px solid $weakColTwo;
    font-size: $fsMiddle;
    padding-left: 12px;
    background-color: $weakColOne;
  }
  .txtarea {
    height: 100px;
    border-bottom: 1px solid $weakColTwo;
    font-size: $fsMiddle;
    .van-cell {
      padding: 10px 12px;
    }
  }
  .btn {
    width: 240px;
    height: 42px;
    line-height: 42px;
    font-size: $fsLarge;
    box-sizing: border-box;
    text-align: center;
    margin: 0 auto;
    border-radius: 2px;
  }
  .order-btn {
    border: 1px solid $impColOne;
    color: $impColOne;
    margin-top: 85px;
  }
  .sign-btn {
    background-color: $impColOne;
    color: $white;
    margin-top: 22px;
  }
}
</style>
