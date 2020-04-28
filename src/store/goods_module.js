import Vue from "vue";
export default {
  namespaced: true,
  state: {
    goodsList: [],
    salesList: [],
    typeGoodsList: [],
    goodItem: {},
    wareHouse: [],
    shopCart: []
  },
  mutations: {
    setGoodsList(state, goodsList) {
      state.goodsList = goodsList;
    },
    appendGoodsList(state, goodsList) {
      state.goodsList.push(...goodsList);
    },
    onSalesList(state) {
      state.salesList = state.goodsList.filter(item => item.onsales === true);
    },
    setTypeGoodsList(state, type) {
      state.typeGoodsList = state.goodsList.filter(item => item.type === type);
    },
    setGoodItem(state, id) {
      state.goodItem = state.goodsList.find(item => item.id == id);
    },
    setWareHouse(state, wareHouse) {
      state.wareHouse = wareHouse;
    },
    addShopCart(state, shopCart) {
      /**
       * 购物车的结构：
       * [
       *  {
       *    shopId: 20,
       *    shopName: '李爽肤水超市！',
       *    warehouse: [{
       *      remark: '',
       *      warehouseId: 10002,
       *      warehouseName: 'ss',
       *      checked: true,
       *      goods: [{
       *        goodsInfo: { 商品对象 },
       *        count: 20,
       *        chcked: true
       *      }]
       *    }]
       *  }
       * ]
       */
      let shopIndex = state.shopCart.findIndex(item => item.shopId == shopCart.shopId);
      if (shopIndex < 0) {
        console.log("购物车中无此超市，添加此超市");
        state.shopCart.push({
          shopId: shopCart.shopId,
          shopName: shopCart.shopName,
          shopChecked: shopCart.shopChecked,
          goods: [
            {
              goodsInfo: shopCart.goodsInfo,
              count: shopCart.count,
              remark: shopCart.remark,
              warehouseId: shopCart.warehouseId,
              warehouseName: shopCart.warehouseName,
              goodsChecked: shopCart.goodsChecked
            }
          ]
        });
      } else {
        console.log("购物车中已有此超市");
        let goodsIndex = state.shopCart[shopIndex].goods.findIndex(item => item.goodsInfo.id == shopCart.goodsInfo.id);
        if (goodsIndex < 0) {
          console.log("购物车中无此商品，添加此商品");
          state.shopCart[shopIndex].goods.push({
            goodsInfo: shopCart.goodsInfo,
            count: shopCart.count,
            remark: shopCart.remark,
            warehouseId: shopCart.warehouseId,
            warehouseName: shopCart.warehouseName,
            goodsChecked: shopCart.goodsChecked
          });
        } else {
          console.log("购物车中已有此商品");
          let goods = state.shopCart[shopIndex].goods;
          let newCount = state.shopCart[shopIndex].goods[goodsIndex].count + shopCart.count;
          console.log("state_c:", state.shopCart[shopIndex].goods[goodsIndex].count);
          console.log("params_c:", shopCart.count);
          console.log("newC:", newCount);
          Vue.set(goods[goodsIndex], "count", newCount);
        }
      }
    },
    changeCartCount(state, payload) {
      let shop = state.shopCart.find(item => item.shopId == payload.shopId);
      let goods = shop.goods.find(item => item.goodsInfo.id == payload.goodsId);
      let newCount = goods.count + payload.count;
      Vue.set(goods, "count", newCount);
    },
    changeGoodsChecked(state, payload) {
      let shop = state.shopCart.find(item => item.shopId == payload.shopId);
      let goods = shop.goods.find(item => item.goodsInfo.id == payload.goodsId);
      let newGoodsChecked = payload.goodsChecked;
      Vue.set(goods, "goodsChecked", newGoodsChecked);
      // let fasleIndex = shop.goods.findIndex(item => item.goodsChecked == false);
      // if (fasleIndex !== -1) {
      //   Vue.set(shop, "shopChecked", false);
      // }
    },
    changeShopChecked(state, payload) {
      let shop = state.shopCart.find(item => item.shopId == payload.shopId);
      let newShopChecked = payload.shopChecked;
      Vue.set(shop, "shopChecked", newShopChecked);
      shop.goods.forEach(item => {
        Vue.set(item, "goodsChecked", payload.shopChecked);
      });
    }
  }
};
