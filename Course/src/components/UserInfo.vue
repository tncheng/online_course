<template>
  <div class="user-main-page">
    <div class="user-body">
      <el-tabs v-model="activeName" @tab-click="handClick">
        <el-tab-pane label="我的课程" name="myCourse">
          <div class="course">
            <ul>
              <li v-for="item in courseList" v-bind:key="item.id" class="item-course">
                <router-link class="course-link" v-bind:to="item.courseUrl" >
                  <div class="course-pic">
                    <img src='../assets/img/courseIcon.jpg' alt="sorry " width="100%">
                  </div>
                  <div class="course-name">{{item.text}}</div>
                  <div class="course-author">{{item.teacher}}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的评论" name="myComment">
          <div class="comment">
            <ul class="outline-list">
                <li v-for="item in commentList" v-bind:key="item.id" class="item-comment">
                  <div>
                    <div class="comment-info">
                      <span style="width:50px"><img src="../assets/img/big.jpg" alt="sorry" style="border-radius:50%" width="80%"></span>
                      <span style="color:#286cb5;">{{item.name}}</span>
                      <span style="font-size:0.8em;margin-left:70%;">{{item.comTime}}</span>
                      <span style="font-size:0.8em; margin-left:5%;">{{item.chapter}}</span>
                    </div>
                    <div class="comment-content">{{item.comDetail}}</div>
                  </div>
                </li>
              </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      courseList: [
        {
          id: 0,
          text: "python",
          courseUrl: "/course/introduction/12",
          courseId: 2,
          teacher: "json"
        },
        {
          id: 1,
          text: "python",
          courseUrl: "/course/introduction/12",
          courseId: 2,
          teacher: "json"
        },
        {
          id: 2,
          text: "python",
          courseUrl: "/sdf",
          courseId: 2,
          teacher: "json"
        },
        {
          id: 3,
          text: "python",
          courseUrl: "/sdf",
          courseId: 2,
          teacher: "json"
        },
        {
          id: 4,
          text: "python",
          courseUrl: "/sdf",
          courseId: 2,
          teacher: "json"
        }
      ],
      commentList: [
        {
          id: 0,
          comDetail: "this class is so expensive",
          comTime: "2017-10-12",
          chapter: "python第一节"
        },
        {
          id: 1,
          comDetail: "this class is so expensive",
          comTime: "2017-10-12",
          chapter: "python第一节"
        },
        {
          id: 2,
          comDetail: "this class is so expensive",
          comTime: "2017-10-12",
          chapter: "python第一节"
        },
        {
          id: 3,
          comDetail: "this class is so expensive",
          comTime: "2017-10-12",
          chapter: "python第一节"
        },
        {
          id: 4,
          comDetail: "this class is so expensive",
          comTime: "2017-10-12",
          chapter: "python第一节"
        }
      ],
      activeName: "myCourse"
    };
  },
  created() {
    var requrl = "/userCourse?cmd=" + this.$store.getters.getUser.userName;
    this.reqCourse(requrl);
  },
  methods: {
    topage: function() {
      this.$router.push({ name: "b", params: { num: 12 } });
    },
    handClick: function(tab, event) {
      var url1 = "/userCourse?cmd=" + this.$store.getters.getUser.userName;
      var url2 = "/userComment?cmd=" + this.$store.getters.getUser.userName;
      if (this.activeName === "myCourse") {
        this.reqCourse(url1);
      } else {
        this.reqComment(url2);
      }
      console.log(this.activeName);
    },
    reqCourse: function(courseUrl) {
      var self = this;
      this.$ajax
        .get(courseUrl)
        .then(function(response) {
          var body = response.data;
          var tempCourseList = [];
          for (var i = 0; i < body.data.length; i++) {
            var req = "/course/introduction/" + body.data[i].courseId;
            tempCourseList.push({
              id: i,
              text: body.data[i].name,
              courseUrl: req,
              courseId: body.data[i].courseId,
              teacher: body.data[i].teacher
            });
          }
          self.courseList = tempCourseList;
          console.log(self.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqComment: function(commentUrl) {
      var self = this;
      this.$ajax
        .get(commentUrl)
        .then(function(response) {
          var body = response.data;
          var tempCommentList = [];
          for (var i = 0; i < body.data.length; i++) {
            var bar = body.data[i].courseName + " " + body.data[i].barName;
            tempCommentList.push({
              id: i,
              comDetail: body.data[i].commentContent,
              comTime: body.data[i].commentTime,
              chapter: bar
            });
          }
          self.commentList = tempCommentList;
          console.log(self.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.user-main-page {
  background-color: #fafafa;
}
.user-body {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}
ul {
  margin-left: 5px;
  margin-right: 5px;
  padding: 0px;
}
li {
  list-style: none;
}
.item-course {
  margin: 5px;
  width: 150px;
  height: 150px;
  display: inline-block;
}
.course-link {
  text-decoration: none;
  color: black;
  font-family: "OpenSans", Arial, sans-serif;
  color: #286cb5;
  font-weight: bold;
}
.course-name {
  text-align: right;
  font-size: 1.5em;
}
.course-author {
  text-align: right;
  font-size: 1.2em;
}
.my-comment {
  font-family: "OpenSans", Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 20px;
  text-align: left;
  line-height: 10px;
  border-bottom: 1px #286cb5 solid;
}
.item-comment {
  margin-left: 50px;
  border-bottom: 1px #286cb5 solid;
  text-align: left;
}
.outline-list {
  margin: 0px;
  padding-left: 5px;
  padding-right: 5px;
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
  line-height: 40px;
  padding-left: 40px;
}
</style>

