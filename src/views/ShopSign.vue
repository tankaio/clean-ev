<template>
  <div class="shopsign">
    <v-header title="商店签到">
      <van-icon name="success" @click="signIn" />
    </v-header>
    <div class="img-rap">
      <div class="img choose-img">
        <div>
          <van-icon name="photograph" />
          <h4>选取图片</h4>
        </div>
        <input type="file" accept="image/*" class="inp-file" multiple @change="uploadImg" style="opacity:0;" />
      </div>
      <div class="img upload-imgs" v-for="item in imgList" :key="item.url" @click="item.isChecked = !item.isChecked">
        <img :src="item.url" />
        <div class="mask" v-if="item.isChecked"><van-icon name="passed" /></div>
      </div>
      <div class="img del-img" @click="delImg">
        <van-icon name="close" />
        <h4>删除图片</h4>
      </div>
    </div>
    <div class="remark-wrap">
      <div class="title">备注：</div>
      <div class="edit-box">
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="点击填写备注~"
          show-word-limit
        />
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from "../components/v-header";
import Vue from "vue";
import { Field, Toast } from "vant";
import { uploadFile, signIn } from "../api/shop";
import canvasResize from "canvas-resize";
import utility from "../utils/utility";
Vue.use(Field);
export default {
  components: {
    VHeader
  },
  data() {
    return {
      message: "",
      imgList: []
    };
  },
  methods: {
    uploadImg(e) {
      let file = e.target.files[0];
      console.log(file);
      let formData = new FormData();

      // 对当前上传的图片file，进行压缩后，callback返回一个base64的字符串
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.7, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback: baseStr => {
          // 将返回的base64字符， 转换成Blob
          let fileBlob = utility.convertBase64UrlToBlob(baseStr, { type: file.type });
          formData.append("imgF", fileBlob);
          uploadFile(formData).then(res => {
            console.log("imgInfo:", res);
            this.imgList.push({ url: process.env.VUE_APP_BASEURL + res.data.img, isChecked: false });
          });
        }
      });
    },
    delImg() {
      this.imgList = this.imgList.filter(item => item.isChecked === false);
    },
    signIn() {
      Toast.setDefaultOptions({ duration: 1000 });
      signIn({
        id: Date.now(),
        shopId: this.$route.params.id,
        SubOn: new Date().toLocaleDateString(),
        imgs: this.imgList.map(item => item.url)
      })
        .then(res => {
          console.log("signIn:", res);
          Toast.success("签到成功");
          this.$router.go(-1);
        })
        .catch(err => {
          Toast.fail("签到失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopsign {
  .van-icon-success {
    font-size: 20px;
    vertical-align: middle;
  }
  .img-rap {
    margin-top: 14px;
    padding: 0 14px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .van-icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .img {
      width: 110px;
      height: 110px;
      border: 1px solid #dddddd;
      font-size: $fsSmall;
      text-align: center;
      float: left;
      margin-right: 8.5px;
      margin-bottom: 14px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .van-icon {
        margin-top: 28px;
      }
      .van-icon-close {
        color: $weakColThree;
      }
      h4 {
        margin-top: 10px;
      }
    }
    .choose-img {
      position: relative;
      .inp-file {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .upload-imgs {
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: $impColOne, $alpha: 0.5);
        .van-icon-passed {
          font-size: $fsLarge;
          color: $white;
        }
      }
    }
  }
  .remark-wrap {
    .title {
      height: 35px;
      line-height: 35px;
      background-color: $weakColOne;
      font-size: $fsSmall;
      padding-left: 14px;
    }
    .edit-box {
      border: 1px solid #f1f1f1;
      .van-cell {
        padding: 10px 14px;
      }
    }
  }
}
</style>
