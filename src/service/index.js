import axios from "axios";

axios.interceptors.request.use(function (config) {
    console.log("service-config: ",JSON.parse(sessionStorage.getItem("userInfo")));
    // let token = JSON.parse(sessionStorage.getItem("userInfo")).token;
    // if (token) {
    //     axios.defaults.headers.Authorization = "Bearer" + token;
    // }
    return config;
});

export default {
    //登录api
    login(data) {
        return axios.post("/api/userlogin", data);
    }
};