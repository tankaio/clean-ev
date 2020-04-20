export default {
  namespaced: true,
  state: {
    shopList: [],
    shopName: ""
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
    }
  }
};
