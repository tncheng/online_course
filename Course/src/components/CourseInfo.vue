<template>
  <div class="course-item-page">
    <div class="course-page">
      <el-row>
        <el-col :span='8'>
          <div class="course-catelog">
            <ul class="nav">
              <li class="catelog-item"><div class="item-anchor" v-on:click="toAchor(0)">总览</div></li>
              <li class="catelog-item"><div class="item-anchor" v-on:click="toAchor(0)">简介</div></li>
              <li class="catelog-item"><div class="item-anchor" v-on:click="toAchor(1)">制作方</div></li>
              <li class="catelog-item"><div class="item-anchor" v-on:click="toAchor(2)">授课大纲</div></li>
              <li class="catelog-item"><div class="item-anchor" v-on:click="toAchor(3)">评价</div></li>
              <li class="user-option" v-if="get_userState == true && get_isHas == false"><el-button type="primary" class="option-item" v-on:click="joinCourse">立即参与</el-button></li>
              <li class="user-option" v-if="get_userState == true && get_isHas == true"><el-button type="primary" class="option-item" v-on:click="toLearning">继续学习</el-button></li>
              <li class="user-option" v-if="get_userState == false"><el-button type="primary" class="option-item" id="login">点击登录</el-button></li>
            </ul>
          </div>
        </el-col>
        <el-col :span='16'>
          <div class="course-intro">
            <div class="intro-mudle" id="01">
              <div class="course-title">{{courseInfo.name}}
              </div>
              <div class="course-about">
                <p class="course-intro-content"><strong class="intro-text">关于此课程：</strong>{{courseInfo.introduction}}</p>
              </div>
            </div>
            <div class="intro-mudle" id="03"><strong>授课教师:</strong>  {{courseInfo.teacher}}</div>
            <div class="intro-mudle" id="02">
              <div class="module-title"><strong>大纲</strong></div>
              <ul class="outline-list">
                <li v-for="item in courseInfo.outline" v-bind:key="item.id">
                  <router-link :to="item.reqUrl" style="text-decoration:none;color:black;">
                    <div  class="bar-item">
                      <div class="item-count">第{{item.id}}章</div>
                      <div class="item-title">{{item.barName}}</div>
                      <div class="item-operation">开始学习</div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="intro-mudle" id="04">
              <div class="module-title"><strong>评论</strong></div>
              <ul class="outline-list">
                <li v-for="item in courseInfo.comment" v-bind:key="item.id">
                  <div class="item-comment">
                    <div class="comment-info">
                      <span style="width:50px"><img src="../assets/img/big.jpg" alt="sorry" style="border-radius:50%" width="80%"></span>
                      <span style="color:#286cb5;">{{item.name}}</span>
                      <span style="font-size:0.8em;margin-left:70%;">{{item.commentTime}}</span>
                    </div>
                    <div class="comment-content">
                      {{item.commentContent}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
      

  </div>
</template>
<script>
export default {
  name: "CourseItemInfo",
  data() {
    return {
      isHas: false,
      courseInfo: {
        name: "python",
        introduction: "",
        outline: [
          { id: 0, barName: "初识python", reqUrl: "/courseLearning/0" },
          { id: 1, barName: "初识python", reqUrl: "/courseLearning/1" },
          { id: 2, barName: "初识python", reqUrl: "/courseLearning/2" },
          { id: 3, barName: "初识python", reqUrl: "/courseLearning/3" }
        ],
        teacher: "谢仲文",
        comment: [
          {
            id: 0,
            name: "小明",
            commentContent: "这门课很sss好",
            commentTime: "2017-11-10"
          },
          {
            id: 1,
            name: "小明",
            commentContent: "这门课很sss好",
            commentTime: "2017-11-10"
          },
          {
            id: 2,
            name: "小明",
            commentContent: "这门课很sss好",
            commentTime: "2017-11-10"
          }
        ],
        hasCourse: false
      }
    };
  },
  created() {
    // console.log
    // 检查用户是否拥有此门课程确定
    var courseurl = "/courseDetail?cmd=" + this.$route.params.num;
    this.reqCourseInfo(courseurl);
  },
  computed: {
    get_isHas: function() {
      return this.isHas;
    },
    get_userState: function() {
      return this.$store.getters.getUser.isLogin;
    }
  },
  methods: {
    toAchor: function(index) {
      var dest = document.querySelectorAll(".intro-mudle");
      var dis = dest[index].offsetTop;
      document.documentElement.scrollTop = dis;
      console.log(dis);
    },
    joinCourse: function() {
      // 加入课程
      console.log("跳转");
      this.toLearning();
    },
    toLearning: function() {
      var self = this;
      this.$router.push({ path: self.courseInfo.outline[0].reqUrl });
    },
    reqCourseInfo: function(url) {
      console.log(url);
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var body = response.data;
          self.courseInfo.name = body.name;
          self.courseInfo.introduction = body.introduction;
          var tempOut = body.outline;
          var tempList = [];
          for (var i = 0; i < tempOut.length; i++) {
            var barUrl = "/courseLearning/" + tempOut[i].barId;
            tempList.push({
              id: i,
              barName: tempOut[i].barName,
              reqUrl: barUrl
            });
          }
          self.courseInfo.outline = tempList;
          self.courseInfo.teacher = body.teacher;
          var tempCom = body.comment;
          var tempCourse = [];
          for (var j = 0; j < tempCom.length; j++) {
            tempCourse.push({
              id: j,
              name: tempCom[j].name,
              commentContent: tempCom[j].commentContent,
              commentTime: tempCom[j].commentTime
            });
          }
          self.courseInfo.comment = tempCourse;
          self.courseInfo.hasCourse = body.hasCourse;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.course-page {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}
.course-catelog {
  padding: 3%;
}
.course-intro {
  padding: 2%;
  text-align: left;
}
.nav {
  margin: 0px 10% 0px 15%;
  padding: 0px;
}
li {
  list-style: none;
  text-align: left;
  font-family: "OpenSans", Arial, sans-serif;
  font-size: 1em;
  background-color: #f1f1f1;
}
.item-anchor {
  text-decoration: none;
  color: black;
  padding: 13px;
  display: block;
}
.intro-mudle {
  margin-bottom: 5%;
}
.user-option {
  text-align: center;
}
.option-item {
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 30px 20%;
  font-size: 200%;
  line-height: 100%;
}
p {
  font-family: "OpenSans", Arial, sans-serif;
}
.course-title {
  font-size: 2em;
  padding-left: 3%;
  padding-right: 3%;
  line-height: 40px;
  margin-top: 30px;
  margin-bottom: 25px;
}
.module-title {
  font-family: "OpenSans", Arial, sans-serif;
  padding-left: 2%;
  height: 40px;
}
.outline-list {
  margin: 0px;
  padding-left: 5px;
  padding-right: 5px;
}
.item-count {
  display: inline-block;
  width: 15%;
}
.item-title {
  display: inline-block;
  width: 58%;
}
.item-operation {
  text-align: right;
  display: inline-block;
  width: 20%;
}
.bar-item {
  line-height: 40px;
}
.comment-info {
  display: flex;
  justify-content: left;
  align-items: center;
}
.comment-content {
  font-family: "OpenSans", Arial, sans-serif;
  font-size: 1em;
  color: black;
  line-height: 50px;
  padding-left: 30px;
}
</style>


