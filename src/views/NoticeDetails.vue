<template>
  <div class="notice-details">
    <v-header title="公告信息"></v-header>
    <div class="notice-body">
      <h3>{{ noticeDetails.title }}</h3>
      <p>{{ noticeDetails.text }}</p>
      <div>
        时间：<time>{{ noticeDetails.date }}</time>
      </div>
      <div>
        地点：<span>{{ noticeDetails.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import { mapState, mapMutations } from "vuex";
import { setNoticeIsRead } from "../api/notice";
export default {
  components: {
    VHeader
  },
  data() {
    return {
      noticeDetails: null
    };
  },
  computed: {
    ...mapState(["noticeList"])
  },
  methods: {
    ...mapMutations(["setNoticeIsRead"])
  },
  created() {
    this.noticeDetails = this.noticeList.find(elem => elem.id == this.$route.params.id);
    setNoticeIsRead(this.$route.params.id).then(({ data }) => {
      if (data.code === 1) this.setNoticeIsRead(this.$route.params.id);
    });
  }
};
</script>

<style lang="scss">
.notice-details {
  margin-top: 44px;
  .v-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .notice-body {
    padding: 16px;
    color: $black;
    h3 {
      font-size: $fsMiddle;
    }
    p,
    div {
      font-size: $fsSmall;
      letter-spacing: 1.2px;
      line-height: 25px;
    }
  }
}
</style>
