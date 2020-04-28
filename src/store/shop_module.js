export default {
  namespaced: true,
  state: {
    shopList: [],
    shopName: "",
    curShop: {}
  },
  mutations: {
    setShopList(state, shopList) {
      state.shopList = shopList;
    },
    loadMoreShops(state, shopList) {
      state.shopList.push(...shopList);
    },
    searchShop(state, shopList) {
      state.shopList = shopList;
    },
    getShopName(state, id) {
      let shop = state.shopList.find(elem => elem.id == id);
      state.shopName = shop.name;
    },
    setCurShop(state, id) {
      state.curShop = state.shopList.find(item => item.id == id);
    }
  }
};
