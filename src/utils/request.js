import axios from "axios";

const BASEURL = process.env.production ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 5000
});

// 添加请求拦截器
const interceptor = service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo) config.headers.Authorization = "Bearer " + userInfo.token;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

console.log("request_env:", process.env.NODE_ENV);

export default service;
