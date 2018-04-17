<template>
  <div class="show-search-course">
    <ul>
        <div class="search-title">相关课程</div>
        <li v-for="item in resultList" v-bind:key="item.id" class="course">
            <router-link class="course-link" :to="item.reqUrl">
                <div>
                    <img src="../assets/img/courseIcon.jpg" alt="sorry" width="100%">
                </div>
                <div class="course-name">{{item.text}}</div>
                <div class="course-author">{{item.author}}</div>
            </router-link>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "searchcourse",
  data() {
    return {
      resultList: [
        {
          id: 0,
          text: "python",
          reqUrl: "/course/introduction/01",
          courseId: "01",
          author: "json"
        },
        //   {id: 1, text: 'python', reqUrl: {path: '/course/introduction/01', qurey: {name: 'shuan', data: 9999}}, courseId: '02', author: 'json'}
        {
          id: 2,
          text: "python",
          reqUrl: "kdfk",
          courseId: "03",
          author: "json"
        },
        {
          id: 3,
          text: "python",
          reqUrl: "kdfk",
          courseId: "04",
          author: "json"
        },
        {
          id: 4,
          text: "python",
          reqUrl: "kdfk",
          courseId: "05",
          author: "json"
        },
        {
          id: 5,
          text: "python",
          reqUrl: "kdfk",
          courseId: "06",
          author: "json"
        },
        {
          id: 6,
          text: "python",
          reqUrl: "kdfk",
          courseId: "07",
          author: "json"
        }
      ]
    };
  },
  created() {
    var searchurl = "searchCourse?cmd=" + this.$route.params.des;
    this.reqCurrentCont(searchurl);
  },
  methods: {
    reqCurrentCont: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var body = response.data;
          var tempList = [];
          for (var i = 0; i < body.data.length; i++) {
            var req = "/course/introduction/" + body.data[i].courseId;
            tempList.push({
              id: i,
              text: body.data[i].name,
              reqUrl: req,
              courseId: body.data[i].courseId,
              author: body.data[i].teacher
            });
          }
          self.resultList = tempList;
          console.log(self.resultList);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.show-search-course {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}
ul {
  padding: 0px;
}
.search-title {
  text-align: left;
  font-family: "OpenSans", Arial, sans-serif;
  color: #286cb5;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 10px;
}
li {
  list-style: none;
}
.course {
  margin: 5px;
  height: 150px;
  width: 150px;
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
</style>

