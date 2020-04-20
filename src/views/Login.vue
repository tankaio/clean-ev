<template>
  <!-- eslint-disable  -->
  <div class="login">
    <!-- title -->
    <h3 class="title">欢迎登录宝洁SFA系统</h3>
    <div class="hat"></div>
    <div class="login-warp">
      <!-- logo -->
      <img src="../assets/logo.jpg" />
      <!-- form -->
      <div :class="['input-group', isValiComId]" @input="comIdValidate">
        <label>公司编号：</label>
        <input type="text" v-model="comId" placeholder="4~6位数字" @blur="comIdBlur" />
      </div>
      <div :class="['input-group', 'mt', isValiEmpId]" @input="empIdValidate">
        <label>员工编号：</label>
        <input type="text" v-model="empId" placeholder="4~6位数字" @blur="empIdBlur" />
      </div>
      <div :class="['input-group', 'mt', isValiPwd]" @input="pwdValidate">
        <label>登录密码：</label>
        <input type="text" v-model="pwd" placeholder="6~15位数字" @blur="pwdBlur" />
      </div>
      <div class="check-warp">
        <div @click="savePwd">
          <i class="iconfont icon-jizhumima" v-if="!isSavePwd"></i>
          <i class="iconfont icon-checked" v-else></i>
          <span>保存密码</span>
        </div>
        <div @click="autoLogin">
          <i class="iconfont icon-jizhumima" v-if="!isAutoLogin"></i>
          <i class="iconfont icon-checked" v-else></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script>
import { login } from "../api/login";
import { numValidate, pwdValidate } from "../utils/validate";
import { mapMutations } from "vuex";
import { Notify, Toast } from "vant";
export default {
  name: "login",
  data() {
    return {
      //公司编号
      comId: "",
      //员工编号
      empId: "",
      //登陆密码
      pwd: "",
      //是否保存密码
      isSavePwd: false,
      //是否自动登录
      isAutoLogin: false,
      //公司编号验证是否成功
      isValiComId: "",
      //员工编号验证是否成功
      isValiEmpId: "",
      //密码验证是否成功
      isValiPwd: false
    };
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    //公司编号验证
    comIdValidate() {
      this.isValiComId = numValidate(this.comId) ? "active" : "error";
    },
    //员工编号验证
    empIdValidate() {
      this.isValiEmpId = numValidate(this.empId) ? "active" : "error";
    },
    //密码验证
    pwdValidate() {
      this.isValiPwd = pwdValidate(this.pwd) ? "active" : "error";
    },
    //公司编号输入框失焦验证
    comIdBlur() {
      if (!this.comId) Notify({ background: "#24be5a", message: "公司编号不能为空", duration: 1500 });
    },
    //员工编号输入框失焦验证
    empIdBlur() {
      if (!this.empId) Notify({ background: "#24be5a", message: "员工编号不能为空", duration: 1500 });
    },
    //密码输入框失焦验证
    pwdBlur() {
      if (!this.pwd) {
        Notify({ background: "#24be5a", message: "密码不能为空", duration: 1500 });
        return;
      }
      if (!pwdValidate(this.pwd)) {
        Notify({ background: "#24be5a", message: "密码至少包含大小字字母，数字和特殊符号中两种", duration: 3000 });
        return;
      }
    },
    //登录
    login() {
      let data = { CNO: this.comId, PNO: this.empId, Passwd: this.pwd };
      login(data).then(({ data }) => {
        console.log("response-data:", data);
        let toast = Toast.loading({
          message: "登录中...",
          duration: 0, // 持续展示 toast
          forbidClick: true
        });
        if (data.code === 0) {
          // 手动清除 Toast
          toast.clear();
          Toast.fail(data.msg);
        } else if (data.code === 1) {
          // 手动清除 Toast
          toast.clear();
          Toast.success(data.msg);
          this.$router.push({ name: "home", path: "/home" });

          //如果勾选了自动登录则保存登录信息到localStorage
          if (this.isAutoLogin) {
            let loginInfo = {
              comId: this.comId,
              empId: this.empId,
              pwd: this.pwd,
              isSavePwd: true,
              isAutoLogin: true
            };
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
          } else if (this.isSavePwd) {
            //勾选了保存密码同样保存登录信息到localStorage
            let loginInfo = {
              comId: this.comId,
              empId: this.empId,
              pwd: this.pwd,
              isSavePwd: true
            };
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
          }

          //登录后将用户信息和token存到vuex中;并在sessionStorage中存一份(因为页面一刷新vuex中数据就没有了)
          let userInfo = { user: data.user, token: data.token };
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.getUserInfo(userInfo);
        }
      });
    },
    //保存密码
    savePwd() {
      if (this.isSavePwd && this.isAutoLogin) this.isAutoLogin = false;
      this.isSavePwd = !this.isSavePwd;
    },
    //自动登录
    autoLogin() {
      !this.isSavePwd && (this.isSavePwd = true);
      this.isAutoLogin = !this.isAutoLogin;
    },
    //勾选了保存密码或自动登录后再次进入登录页时页面数据的再赋值
    viewAssign(loginInfo) {
      this.comId = loginInfo.comId;
      this.empId = loginInfo.empId;
      this.pwd = loginInfo.pwd;
      if (loginInfo.isAutoLogin) {
        this.isAutoLogin = loginInfo.isAutoLogin;
        this.isSavePwd = loginInfo.isSavePwd;
      } else if (loginInfo.isSavePwd) {
        this.isSavePwd = loginInfo.isSavePwd;
      }
    }
  },
  mounted() {
    let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo) {
      if (loginInfo.isAutoLogin) {
        this.viewAssign(loginInfo);
        this.login();
      } else if (loginInfo.isSavePwd) {
        this.viewAssign(loginInfo);
      }
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: $impColThree;
  &::before {
    content: "";
    display: table;
  }
  .title {
    margin: 0;
    color: $white;
    font-size: $fsLarge;
    font-weight: normal;
    text-align: center;
    margin-top: 40px;
  }
  .hat {
    width: 250px;
    height: 10px;
    background-color: $weakColTwo;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 10px 10px 0 0;
  }
  .login-warp {
    width: 300px;
    height: (836px/2);
    background-color: $white;
    margin: 0 auto;
    border-radius: 8px;
    position: relative;
    img {
      width: 95px;
      height: 95px;
      margin-top: 40px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .input-group {
      width: 250px;
      height: 45px;
      line-height: 45px;
      border: 1px solid $weakColTwo;
      margin: 0 auto;
      color: $normalColTwo;
      font-size: $fsMiddle;
      border-radius: 22.5px;
      overflow: hidden;
      margin-top: 40px;
      &.error {
        border: 1px solid $weakColThree;
      }
      &.active {
        border: 1px solid $impColOne;
      }
      label {
        margin-left: 15px;
      }
      input {
        width: 150px;
        height: 40px;
        border: none;
        outline: none;
      }
    }
    .mt {
      margin-top: 15px;
    }
    .check-warp {
      width: 250px;
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
      margin-top: 20px;
      font-size: $fsSmall;
      color: $normalColTwo;
      i {
        margin-right: 3px;
        vertical-align: middle;
      }
      .iconfont {
        font-size: 22px;
      }
      .icon-checked {
        color: $impColOne;
      }
    }
  }
  .login-btn {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: $white;
    color: $impColOne;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10px;
    font-size: $fsLarge;
    letter-spacing: 5px;
  }
}
</style>
