import service from "../utils/request";

/**
 * 获取商品
 */
export function getGoods(page, limit) {
  return service({
    url: "/auth/goods",
    method: "GET",
    params: {
      _page: page,
      _limit: limit
    }
  });
}
