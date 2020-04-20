<template>
  <div class="notice">
    <v-header title="公司通告"> </v-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        :offset="200"
      >
        <ul>
          <li v-for="item in noticeList" :key="item.id">
            <router-link :to="'/noticedetails/' + item.id" class="notice-item">
              <div class="icon-wrap">
                <span class="isRead" :class="{ isGray: !item.isRead }"></span>
              </div>
              <div class="info-wrap">
                <div class="info">
                  <h4>{{ item.title }}</h4>
                  <time>{{ item.SubDate }}</time>
                </div>
                <div class="arrow-wrap">
                  <van-icon name="arrow" />
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import vHeader from "../components/v-header";
import { getNoticeList } from "../api/notice";
import { List, PullRefresh } from "vant";
import { mapMutations, mapState } from "vuex";
Vue.use(List).use(PullRefresh);
export default {
  name: "notice",
  components: {
    vHeader
  },
  data() {
    return {
      // noticeList: [],
      loading: false,
      finished: false,
      refreshing: false,
      startTime: "",
      endTime: ""
    };
  },
  computed: {
    ...mapState(["noticeList"])
  },
  methods: {
    ...mapMutations(["getNoticeList", "loadMoreTop", "loadMoreBottom"]),
    onLoad() {
      getNoticeList(this.endTime, 10, false).then(({ data }) => {
        console.log("onLoad-data:", data);
        if (data.data.messages.length <= 0) {
          this.loading = false;
          this.finished = true;
          return;
        }
        if (data.msg === "ok") {
          // this.noticeList.push(...data.data.messages);
          this.loadMoreBottom(data.data.messages);
          this.endTime = data.data.messages[data.data.messages.length - 1].SubDate;
          this.loading = false;
        }
      });
    },
    onRefresh() {
      getNoticeList(this.endTime, 10, true).then(({ data }) => {
        console.log("onRefresh-data:", data);
        if (data.data.messages.length <= 0) {
          this.refreshing = false;
          return;
        }
        if (data.msg === "ok") {
          // this.noticeList.unshift(...data.data.messages);
          this.loadMoreTop(data.data.messages);
          this.endTime = data.data.messages[0].SubDate;
          this.refreshing = false;
        }
      });
    }
  },
  created() {
    this.startTime = Date.now();
    getNoticeList(this.startTime, 10, true).then(({ data }) => {
      console.log("created-data:", data);
      if (data.data.messages.length <= 0) {
        this.refreshing = false;
        return;
      }
      if (data.msg === "ok") {
        // this.noticeList = data.data.messages;
        this.getNoticeList(data.data.messages);
        this.endTime = data.data.messages[0].SubDate;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.notice {
  padding-top: 44px;
  .v-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
  }
  .notice-item {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;
    .icon-wrap {
      margin-left: 20px;
      .isRead {
        display: block;
        width: 8px;
        height: 8px;
        background-color: $weakColThree;
        border-radius: 50%;
        margin-top: 4px;
        &.isGray {
          background-color: $normalColTwo;
        }
      }
    }
    .info-wrap {
      flex: 1;
      display: flex;
      margin-left: 16px;
      justify-content: space-between;
      align-items: center;
      .info {
        h4 {
          margin: 0;
          font-size: $fsMiddle;
          color: $black;
        }
        time {
          font-size: $fsSmall;
          color: #989898;
          margin-top: 10px;
        }
      }
      .arrow-wrap {
        margin-right: 10px;
        color: #8b8b8b;
        font-size: $fsMiddle;
      }
    }
  }
}
</style>
