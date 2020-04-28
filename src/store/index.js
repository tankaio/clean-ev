import Vue from "vue";
import Vuex from "vuex";

import shop from "./shop_module";
import goods from "./goods_module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    noticeList: []
  },
  mutations: {
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    getNoticeList(state, noticeList) {
      state.noticeList = noticeList;
    },
    loadMoreTop(state, noticeList) {
      state.noticeList.unshift(...noticeList);
    },
    loadMoreBottom(state, noticeList) {
      state.noticeList.push(...noticeList);
    },
    setNoticeIsRead(state, id) {
      let findIndex = state.noticeList.findIndex(elem => elem.id == id);
      let findItem = state.noticeList[findIndex];
      findItem.isRead = true;
      state.noticeList.splice(findIndex, 1, findItem);
    },
    updateUserInfo(state, updateUserInfo) {
      state.userInfo.user = updateUserInfo;
    },
    clearAll(state) {
      state = {};
    }
  },
  actions: {},
  modules: {
    shop,
    goods
  }
});
