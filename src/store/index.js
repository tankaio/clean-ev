import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    getUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {},
  modules: {}
});
