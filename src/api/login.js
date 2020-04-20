import service from "../utils/request";
/**
 * 登录
 * @params data中包含CNO-公司编号,PNO-员工编号,Passwd-密 码
 */
export function login(data) {
  return service({
    method: "post",
    url: "/userlogin",
    data: data
  });
}
