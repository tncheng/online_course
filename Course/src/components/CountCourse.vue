<template>
  <div class="all-count">
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按课程类型统计" name="cateCount">
            <div ref="canvas1" style="width: 1000px;height:400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="按视频查看次数统计" name="vedioCount">
            <div ref="canvas2" style="width: 1000px;height:400px;"></div>
            <div v-for="item in allData" v-bind:key="item.id" style="display:inline-block;padding-left:10px;">
               <el-button type="primary" @click="change(item.id)">{{item.courseName}}</el-button>
            </div >
            <div ref="canvas3" style="width: 1000px;height:400px;"></div>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import echarts from "echarts";
var myChart1;
var myChart2;
var subChart;
export default {
  data() {
    return {
      activeName: "cateCount",
      allData: [
        {
          id: 0,
          courseName: "dddddd",
          courseTimes: 0,
          barList: [{ barName: "", times: 0 }]
        },
        {
          id: 1,
          courseName: "dddd",
          courseTimes: 0,
          barList: [{ barName: "", times: 0 }]
        },
        {
          id: 2,
          courseName: "dddd",
          courseTimes: 0,
          barList: [{ barName: "", times: 0 }]
        }
      ],
      isSub: false,
      myOperation: {
        title: { text: "课程分类数量" },
        tooltip: {},
        xAxis: { data: [] },
        yAxis: {},
        series: [{ name: "点击", type: "bar", data: [] }]
      },
      subOperation: {
        title: { text: "" },
        tooltip: {},
        xAxis: { data: [] },
        yAxis: {},
        series: [{ name: "点击", type: "bar", data: [] }]
      }
    };
  },
  created() {
    this.reqCateNum("/countCourse");
  },
  mounted: function() {
    myChart1 = echarts.init(this.$refs.canvas1);
    myChart2 = echarts.init(this.$refs.canvas2);
    myChart2.on("click", function(params) {
      console.log(params);
      this.isSub = true;
      console.log("issub:" + this.isSub);
    });
    // myChart2.setOption({
    //   title: {
    //     text: "课程分类课程数量"
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: []
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: []
    //     }
    //   ]
    // });
    subChart = echarts.init(this.$refs.canvas3);
  },
  methods: {
    handleClick: function(tab, event) {
      console.log(this.activeName);
      var url = "";
      if (this.activeName === "cateCount") {
        url = "/countCourse";
        this.reqCateNum(url);
      } else {
        url = "/countCourse?cmd=countTimes";
        this.reqCourseNum(url);
      }
    },
    change: function(id) {
      console.log(id);
      var tempBarList = this.allData[id].barList;
      var subXdata = [];
      var subSeries = [];
      for (var j = 0; j < tempBarList.length; j++) {
        subXdata.push(tempBarList[j].barName);
        subSeries.push(tempBarList[j].times);
      }
      this.subOperation.title.text = this.allData[id].courseName;
      this.subOperation.xAxis.data = subXdata;
      this.subOperation.series[0].data = subSeries;
      subChart.setOption(this.subOperation);
    },
    reqCateNum: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var tempx = [];
          var temps = [];
          var body = response.data;
          // console.log(body)
          for (var i = 0; i < body.data.length; i++) {
            tempx.push(body.data[i].categoryName);
            temps.push(body.data[i].categoryNumber);
          }
          self.myOperation.xAxis.data = tempx;
          self.myOperation.series[0].data = temps;
          myChart1.setOption(self.myOperation);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqCourseNum: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var body = response.data;
          var tempCourse = [];
          var tempx = [];
          var temps = [];
          for (var i = 0; i < body.data.length; i++) {
            tempCourse.push({
              id: i,
              courseName: body.data[i].courseName,
              courseTimes: body.data[i].courseTimes,
              barList: body.data[i].barList
            });
            tempx.push(body.data[i].courseName);
            temps.push(body.data[i].courseTimes);
          }
          self.xdata = tempx;
          self.seriess = temps;
          self.allData = tempCourse;
          self.myOperation.xAxis.data = tempx;
          self.myOperation.series[0].data = temps;
          myChart2.setOption(self.myOperation);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.all-count {
  argin-left: 5px;
  margin-right: 5px;
  padding: 25px;
  text-align: left;
}
</style>
