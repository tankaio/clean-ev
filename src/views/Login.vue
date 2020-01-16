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
      <div
        class="input-group"
        @click="inpIndex=1"
        :class="{active:isValiComId,error:inpIndex==1&&!isValiComId}"
      >
        <label>公司编号：</label>
        <input
          type="text"
          v-model="comId"
          placeholder="4~6位数字"
          @blur="valiComId"
          @input="valiComId"
        />
      </div>
      <div
        class="input-group mt"
        @click="inpIndex=2"
        :class="{active:isValiEmpId,error:inpIndex==2&&!isValiEmpId}"
      >
        <label>员工编号：</label>
        <input
          type="text"
          v-model="empId"
          v
          placeholder="4~6位数字"
          @blur="valiEmpId"
          @input="valiEmpId"
        />
      </div>
      <div
        class="input-group mt"
        @click="inpIndex=3"
        :class="{active:IsValiPwd,error:inpIndex==3&&!IsValiPwd}"
      >
        <label>登录密码：</label>
        <input type="text" v-model="pwd" placeholder="6~15位数字" @blur="valiPwd" @input="valiPwd" />
      </div>
      <div class="check-warp">
        <div @click="savePwd">
          <i class="iconfont icon-jizhumima" v-if="isSavePwd"></i>
          <i class="iconfont icon-checked" v-else></i>
          <span>保存密码</span>
        </div>
        <div @click="autoLogin">
          <i class="iconfont icon-jizhumima" v-if="isAutoLogin"></i>
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
import service from "../service";
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "login",
  components: {
    // eslint-disable-next-line
    Toast
  },
  data() {
    return {
      //公司编号
      comId: "",
      //员工编号
      empId: "",
      //登陆密码
      pwd: "",
      inpIndex: 1,
      //是否保存密码
      isSavePwd: true,
      //是否自动登录
      isAutoLogin: true,
      //公司编号验证是否成功
      isValiComId: false,
      //员工编号验证是否成功
      isValiEmpId: false,
      //密码验证是否成功
      IsValiPwd: false
    };
  },
  mounted() {
    // 重新进入登录页后取出存储在localstorage中的保存密码赋值给input并验证状态
    let data = JSON.parse(localStorage.getItem("loginInfo"));
    if (data && !data.isSavePwd) {
      this.comId = data.comId;
      this.empId = data.empId;
      this.pwd = data.pwd;
      this.isSavePwd = data.isSavePwd;
    }
    this.valiComId();
    this.valiEmpId();
    this.valiPwd();
    if (JSON.parse(localStorage.getItem("isAutoLogin")) === false) {
      this.isAutoLogin = false;
      setTimeout(() => {
        this.login();
      }, 2000);
    }
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    test() {
      console.log(1);
    },
    //保存密码
    savePwd() {
      //点击保存密码框选中与不选中状态取反
      this.isSavePwd = !this.isSavePwd;
      //若保存密码框没选中，则自动登录框一定不选中（因为只有保存了密码才能自动登录）
      this.isSavePwd && (this.isAutoLogin = true);
    },
    //自动登陆
    autoLogin() {
      //点击自动登陆框选中与不选中状态取反
      this.isAutoLogin = !this.isAutoLogin;
      //若自动登录框选中，则保存密码框一定选中，反之亦然
      !this.isAutoLogin ? (this.isSavePwd = false) : (this.isSavePwd = true);
    },
    //验证函数
    // eslint-disable-next-line
    // valiFn(regularEx, typeId, typeIsid) {
    //   regularEx.test(typeId) ? (typeIsid = true) : (typeIsid = false);
    //   console.log(regularEx);
    //   console.log(typeId);
    //   console.log(typeIsid);
    // },
    //验证公司编号
    valiComId() {
      /^\d{4,6}$/.test(this.comId)
        ? (this.isValiComId = true)
        : (this.isValiComId = false);
    },
    //验证员工编号
    valiEmpId() {
      /^\d{4,6}$/.test(this.empId)
        ? (this.isValiEmpId = true)
        : (this.isValiEmpId = false);
    },
    //验证密码
    valiPwd() {
      /^\w.{5,16}$/.test(this.pwd)
        ? (this.IsValiPwd = true)
        : (this.IsValiPwd = false);
    },
    login() {
      if (!this.comId || !this.empId || !this.pwd) {
        console.log("用户名或密码不能为空");
        return;
      }
      Toast.loading({
        message: "使劲登录中...",
        forbidClick: true
      });
      service
        .login({
          CNO: this.comId,
          PNO: this.empId,
          Passwd: this.pwd
        })
        .then(result => {
          console.log("result-login: ",result);
          if (result.data.code == 1) {
            //记住密码
            if (!this.isSavePwd) {
              localStorage.setItem(
                "loginInfo",
                JSON.stringify({
                  comId: this.comId,
                  empId: this.empId,
                  pwd: this.pwd,
                  isSavePwd: this.isSavePwd
                })
              );
            }
            if (!this.isAutoLogin) {
              localStorage.setItem("isAutoLogin", this.isAutoLogin);
            }
            //存入vux
            this.getUserInfo(result.data.user);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                user: result.data.user,
                token: result.data.token
              })
            );
            this.$router.push("/home");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
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
    .error {
      border: 1px solid $weakColThree;
    }
    .active {
      border: 1px solid $impColOne;
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
