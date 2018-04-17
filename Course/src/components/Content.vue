<template>
  <div class="content-page">
    <div class="content-body">
      <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick" class="content-nav">
        <el-tab-pane v-for="item in list" v-bind:key="item.id" :label="item.categoryName" :name="item.categoryId" class="item-content" >
          <div class="current-course">
            <ul>
              <li v-for="itemc in resultList" v-bind:key="itemc.id" class="course">
                <router-link class="course-link" :to="itemc.reqUrl">
                  <div>
                    <img src="../assets/img/courseIcon.jpg" alt="sorry" width="100%">
                  </div>
                  <div class="course-name">{{itemc.name}}</div>
                  <div class="course-author">{{itemc.teacher}}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
          <div class="content-info" v-if="getIntro == true">
            <div class="info-cont">上百门关于计算机、商务的课程，尽在Learning</div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      activeName: "",
      list: [
        { id: 0, categoryName: "计算机", categoryId: "01" },
        { id: 1, categoryName: "生活", categoryId: "life" },
        { id: 3, categoryName: "其他", categoryId: "other" }
      ],
      resultList: [
        {
          id: 0,
          name: "python",
          reqUrl: "/course/introduction/01",
          courseId: "01",
          teacher: "json"
        },
        //   {id: 1, text: 'python', reqUrl: {path: '/course/introduction/01', qurey: {name: 'shuan', data: 9999}}, courseId: '02', author: 'json'}
        {
          id: 2,
          name: "python",
          reqUrl: "/course/introduction/02",
          courseId: "03",
          teacher: "json"
        },
        {
          id: 3,
          name: "python",
          reqUrl: "/course/introduction/03",
          courseId: "04",
          teacher: "json"
        },
        {
          id: 4,
          name: "python",
          reqUrl: "/course/introduction/04",
          courseId: "05",
          teacher: "json"
        },
        {
          id: 5,
          name: "python",
          reqUrl: "/course/introduction/05",
          courseId: "06",
          teacher: "json"
        },
        {
          id: 6,
          name: "python",
          reqUrl: "/course/introduction/06",
          courseId: "07",
          teacher: "json"
        }
      ],
      introState: true
    };
  },
  computed: {
    getIntro: function() {
      if (this.$route.path === "/browse") {
        this.introState = true;
      } else {
        this.introState = false;
      }
      return this.introState;
    }
  },
  created() {
    if (this.$route.name === "Browse") {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
    this.reqContent();
  },
  methods: {
    handleClick: function(tab, event) {
      var url = "/browse/" + this.activeName;
      var req = "/courseCateGory?cmd=" + this.activeName;
      console.log(req);
      this.$router.push({ path: url });
      var self = this;
      // self.resultList = []
      this.$ajax
        .get(req)
        .then(function(response) {
          // console.log(response)
          var body = response.data;
          var tempCourseList = [];
          console.log(body);
          for (var i = 0; i < body.data.length; i++) {
            var courseUrl = "/course/introduction/" + body.data[i].courseId;
            tempCourseList.push({
              id: i,
              name: body.data[i].name,
              reqUrl: courseUrl,
              courseId: body.data[i].courseId,
              teacher: body.data[i].teacher
            });
          }
          self.resultList = tempCourseList;
          console.log(self.resultList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqContent: function() {
      var self = this;
      // self.list = []
      this.$ajax
        .get("/courseCateGory")
        .then(function(response) {
          var body = response.data;
          // console.log(body.data)
          // console.log('长度' + body.data.length)
          var tempCateList = [];
          for (var i = 0; i < body.data.length; i++) {
            console.log("执行循环");
            tempCateList.push({
              id: i,
              categoryName: body.data[i].categoryName,
              categoryId: body.data[i].categoryId
            });
          }
          console.log(tempCateList);
          self.list = tempCateList;
          console.log("courseList:" + self.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.content-page {
  /* background-image: url(../assets/img/cotentbac.jpg); */
  min-height: 800px;
}
.content-body {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}
.content-nav {
  padding: 10px;
}

.content-all {
  /* height: 500px; */
  border: 1px red solid;
}
.course {
  margin: 5px;
  height: 150px;
  width: 150px;
  background-color: white;
  display: inline-block;
}
.course-link {
  text-decoration: none;
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
.content-info {
  /* padding: 0px; */
  width: 70%;
  font-family: "Merriweather-Light", Georgia, serif;
  font-size: 2em;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.5);
}
.info-cont {
  padding: 50px 50px 40px 40px;
  color: whitesmoke;
  line-height: 40px;
}
</style>

