<template>
  <div class="v-pie">
    <div class="pie" ref="pie"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入饼状图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
export default {
  name: "v-pie",
  props: {
    title: {
      type: String,
      required: true
    },
    val: {
      type: Number,
      // required: true
    }
  },
  mounted() {
    this.initPie();
  },
  methods: {
    initPie() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.pie);
      // var data = [];
      // 指定图表的配置项和数据
      var option = {
        color: ["rgb(102,208,113)", "rgb(223, 223, 223)"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["95%", "100%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold",
                  color: "#000"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 80, name: "80%" },
              { value: 20, name: "" }
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-pie {
  width: 85px;
  height: 85px;
  .pie {
    width: 85px;
    height: 85px;
  }
  .title {
    font-size: $fsSmall;
    text-align: center;
    margin-top: 15px;
    font-weight: bold;
  }
}
</style>

