<template>
  <div class="mine">
    <v-header title="个人信息"><span>修改密码</span></v-header>
    <div class="body">
      <div class="avatar-wrap">
        <img :src="userInfo.avatar" class="avatar" @click="openFile" />
        <input type="file" class="inp-file_upload" accept="image/*" ref="file" @change="openFileHandler" />
      </div>
      <van-cell-group>
        <van-cell title="员工姓名" :value="userInfo.name" />
        <van-cell title="手机号码" :value="userInfo.phone" />
        <van-cell title="部门" :value="userInfo.department" />
      </van-cell-group>
      <div class="last-login-time">上次登录时间：{{ userInfo.lastLogin }}</div>
    </div>
    <v-tabbar :itemList="itemList" @click="clickHandler" />
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import VTabbar from "../components/v-tabbar";
import { uploadFile } from "../api/shop";
import { updateUserInfo } from "../api/login";
import canvasResize from "canvas-resize";
import utility from "../utils/utility";
import Vue from "vue";
import { Cell, CellGroup } from "vant";

Vue.use(Cell).use(CellGroup);
export default {
  components: {
    VHeader,
    VTabbar
  },
  data() {
    return {
      itemList: ["重新登录", "注销"],
      userInfo: {}
    };
  },
  methods: {
    openFile() {
      this.$refs.file.click();
    },
    openFileHandler(e) {
      console.log(e.target.files);
      let file = e.target.files[0];
      let formData = new FormData();
      // 对当前上传的图片file，进行压缩后，callback返回一个base64的字符串
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.7, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback: async baseStr => {
          // 将返回的base64字符， 转换成Blob
          let fileBlob = utility.convertBase64UrlToBlob(baseStr, { type: file.type });
          formData.append("imgF", fileBlob);
          let { data } = await uploadFile(formData);
          let newUserInfo = this.$store.state.userInfo.user;
          newUserInfo.avatar = `${process.env.VUE_APP_BASEURL}${data.img}`;
          updateUserInfo(newUserInfo);
          this.$store.commit("updateUserInfo", newUserInfo);
        }
      });
    },
    clickHandler(index) {
      if (index === 0) {
        let userInfo = this.$store.state.userInfo.user;
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("clearAll");
        this.$router.push(`/login?CNO=${userInfo.CNO}&PNO=${userInfo.PNO}`);
      }
      if (index === 1) {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("clearAll");
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo.user;
  }
};
</script>

<style lang="scss" scoped>
.mine {
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
  }
  .center-wrap {
    margin-left: 16px;
  }
  .avatar-wrap {
    text-align: center;
    padding: 15px 0;
    .avatar,
    .inp-file_upload {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;
    }
    .inp-file_upload {
      position: absolute;
      display: none;
    }
  }
  .van-cell__title {
    font-size: $fsMiddle;
    color: $normalColTwo;
  }
  .van-cell__value {
    font-size: $fsMiddle;
    color: $black;
  }
  .last-login-time {
    height: 42px;
    line-height: 42px;
    background-color: $weakColOne;
    padding-left: 14px;
    font-size: $fsSmall;
  }
  .v-tabbar {
    /deep/.item:nth-child(1) {
      color: $impColOne;
    }
    /deep/.item:nth-child(2) {
      color: $weakColThree;
    }
  }
}
</style>
