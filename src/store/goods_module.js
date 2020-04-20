export default {
  namespaced: true,
  state: {
    goodsList: []
  },
  mutations: {
    setGoodsList(state, goodsList) {
      state.goodsList = goodsList;
    },
    appendGoodsList(state, goodsList) {
      state.goodsList.push(...goodsList);
    }
  }
};
