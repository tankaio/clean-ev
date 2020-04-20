<template>
  <div class="shop-visit">
    <v-header title="进店拜访"></v-header>
    <v-tabs :tabList="tabList">
      <template v-slot:计划内>
        <div class="search-wrap">
          <van-icon name="search" @click="search" />
          <input type="text" placeholder="点击进行搜索~" class="search" v-model="searchVal" @keydown.enter="search" />
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="真的一滴也没有了o(╥﹏╥)o"
          @load="onLoad"
          :offset="10"
          :immediate-check="false"
        >
          <div class="shop-wrap">
            <div v-for="item in shopList" :key="item.id">
              <router-link class="shop-item" :to="'/shopactivity/' + item.id">
                <div class="item-top">
                  <h3>{{ item.name }}</h3>
                  <div class="posi">
                    <van-icon name="location" />
                    <span class="distance">{{ item.distance }}m</span>
                  </div>
                </div>
                <div class="item-middle">
                  <div>
                    <span>ID：{{ item.pid }}</span>
                    <time>创建时间：{{ item.subon }}</time>
                  </div>
                  <van-icon name="arrow" />
                </div>
                <div class="item-bottom">
                  <span>{{ item.bossName }}</span>
                  <div class="phone">
                    <van-icon name="graphic" />
                    <span class="phnum">{{ item.phone }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </van-list>
      </template>
      <template v-slot:计划外>
        暂无数据...
      </template>
    </v-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import VHeader from "../components/v-header";
import VTabs from "../components/v-tabs";
import { getShopList } from "../api/shop";
import { mapMutations, mapState } from "vuex";
import { List } from "vant";
Vue.use(List);
export default {
  components: {
    VHeader,
    VTabs
  },
  data() {
    return {
      tabList: ["计划内", "计划外"],
      lat: 0,
      lng: 0,
      loading: false,
      finished: false,
      page: 1,
      searchVal: ""
    };
  },
  computed: {
    ...mapState("shop", ["shopList"])
  },
  methods: {
    ...mapMutations("shop", ["setShopList", "loadMoreShops", "searchShop"]),
    fixPosition() {
      return new Promise((resolve, reject) => {
        let geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");
        geolocation.getLocation(
          position => {
            console.log("posi:", position);
            this.lat = position.lat;
            this.lng = position.lng;
            resolve();
          },
          err => {
            console.log("定位失败！", err);
            reject("定位失败了亲~");
          },
          {}
        );
      });
    },
    getShopList() {
      return new Promise(resolve => {
        let data = { lat: this.lat, lng: this.lng, _page: this.page, name_like: this.searchVal };
        getShopList(data).then(res => {
          console.log("res.data:", res.data);
          this.page++;
          resolve(res.data);
        });
      });
    },
    onLoad() {
      // 异步更新数据
      this.getShopList().then(resolve => {
        if (resolve.length <= 0) {
          this.finished = true;
          return;
        }
        this.loadMoreShops(resolve);
        this.loading = false;
      });
    },
    search() {
      this.page = 1;
      this.getShopList().then(resolve => {
        this.searchShop(resolve);
      });
    }
  },
  created() {
    this.fixPosition()
      .then(this.getShopList)
      .then(resolve => this.setShopList(resolve));
  }
};
</script>

<style lang="scss" scoped>
.shop-visit {
  padding-top: 44px;
  .v-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .search-wrap {
    height: 58px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $weakColTwo;
    .van-icon-search {
      color: #161824;
      font-size: 16px;
      font-weight: bold;
    }
    .search {
      flex: 1;
      padding-left: 7px;
      font-size: $fsSmall;
      border: 0 none;
    }
  }
  .shop-wrap {
    .shop-item {
      height: 88px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid $weakColTwo;
      margin-left: 13px;
      padding-right: 10px;
      font-size: $fsSmall;
    }
    .item-top,
    .item-middle,
    .item-bottom {
      display: flex;
      justify-content: space-between;
    }
    .item-middle,
    .item-bottom {
      color: $normalColTwo;
    }
    .item-top {
      h3 {
        font-size: $fsMiddle;
        color: $black;
      }
      .posi {
        margin-right: 20px;
        color: $black;
      }
      .distance {
        margin-left: 6px;
      }
    }
    .item-middle time {
      margin-left: 24px;
    }
    .item-bottom {
      .phone {
        margin-right: 20px;
        .phnum {
          margin-left: 12px;
          color: $impColOne;
        }
      }
    }
    .van-icon {
      font-size: $fsMiddle;
      vertical-align: baseline;
    }
  }
}
</style>
