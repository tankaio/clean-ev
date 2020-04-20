import service from "../utils/request";

/**
 * 获取通知公告列表数据
 * @params date-查询的日期，默认当前时间,
 * limit-查询的条数，默认是10,
 * isloadelater-是否加载相对于date的之前 的数据，默认是true
 */
export function getNoticeList(date, limit, isloadelater) {
  return service({
    url: "/message",
    method: "get",
    params: { date, limit, isloadelater }
  });
}

/**
 * 设置公司通知已读
 */
export function setNoticeIsRead(id) {
  return service({
    url: `auth/notice/${id}`,
    method: "post"
  });
}
