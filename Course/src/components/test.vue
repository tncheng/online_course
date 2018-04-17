<template>
  <div>
    <div class="xx" ref="canvas">Video</div>

    <el-button @click="change">xx</el-button>

  </div>
</template>

<script>
import echarts from "echarts";
var myChart;
export default {
  mounted: function() {
    myChart = echarts.init(this.$refs.canvas);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  },
  methods: {
    change() {
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [10, 10, 26, 18, 19, 30]
          }
        ]
      });
    }
  }
};
</script>

<style>
.xx {
  width: 500px;
  height: 500px;
}
</style>
