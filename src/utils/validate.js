// 正则--4~6位数字
const REGEXP_NUM_4_6 = /^\d{4,6}$/;
// 正则--密码验证：至少包含大小字字母，数字和特殊符号中两种
const REGEXP_PWD_6_16 = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,15}$/;

/**
 * 验证公司编号、员工编号--4~6位数字
 */
export function numValidate(str) {
  if (REGEXP_NUM_4_6.test(str)) return true;
  else return false;
}

/**
 * 验证登录密码
 */
export function pwdValidate(str) {
  if (REGEXP_PWD_6_16.test(str)) return true;
  else return false;
}
