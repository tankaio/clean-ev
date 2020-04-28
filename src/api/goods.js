import service from "../utils/request";

/**
 * 获取商品
 */
export function getGoods(page, limit, name) {
  return service({
    url: "/auth/goods",
    method: "GET",
    params: {
      _page: page,
      _limit: limit,
      q: name
    }
  });
}
/**
 * 获取所有仓库信息
 */
export function getWareHouse() {
  return service({
    url: "/auth/warehouse",
    method: "GET"
  });
}
