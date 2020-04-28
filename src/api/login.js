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
/**
 * 更改个人数据
 * @params 例如：{
  id: 1000,
  CNO: '1000',
  PNO: 1000,
  username: 'wyd',
  password: 'aicoder.com',
  del: false,
  active: true, //  激活
  avatar: 'http://n.hamkd.com/server/img/a1.png',
  name: '张三',
  department: '市场部',
  lastLogin: "2019-06-19 20:38:45",
  mail: Random.email(),
  phone: '189222222',
  isTeacher: true
}
 */
export function updateUserInfo(data) {
  return service({
    url: `/auth/user/${data.id}`,
    method: "PUT",
    data
  });
}
