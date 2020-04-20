import service from "../utils/request";

/**
 * 获取店铺列表
 * @params lat-经度，lng-纬度
 */
export function getShopList(data) {
  return service({
    url: `/auth/shop?_limit=10&_order=asc&_sort=distance`,
    method: "get",
    params: data
  });
}

/**
 * 获取店铺销售进度
 * @params id-商铺id（主键）
 */
export function getSalesProgress(id) {
  return service({
    url: `/auth/shopSales/${id}`,
    method: "GET"
  });
}

/**
 * 文件上传
 * @params id-签到主键,shopId-店铺主键,SubOn-当天的日期,imgs-签到照片，数组内就是图片的url地址
 */
export function uploadFile(formData) {
  return service({
    url: "/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  });
}

/**
 * 店铺签到
 */
export function signIn(data) {
  return service({
    url: "/auth/signIn",
    method: "POST",
    data: data
  });
}
