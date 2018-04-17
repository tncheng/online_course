<template>
<el-container>
  <el-header>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseBar}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" :disabled="set" class="adclsbtn" @click="addCourse()" >参加此课程</el-button>
    <h1>{{courseName}}</h1>
    
  </el-header>
  <el-container style="height:32em">
    <el-main >
      <!-- Main -->
      <video :src="courseSrc" controls="controls" preload="preload" class="video">
        your browser does not support the video tag
      </video>
    </el-main>

    <el-aside width="20em">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-tickets"></i> 目录</span>
            <ul style="width:100%,list-style-type:none">
              <li v-for="item in BarLine" :key="item.id">
                <router-link :to="'/courseLearning/'+item.barUrl" style="text-decoration:none;color:black;">
                    <div  class="bar-item">
                      {{item.id}}.&nbsp;&nbsp;&nbsp;&nbsp;  {{item.barName}}  
                      <br></br>                    
                    </div>
                  </router-link>
              </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit-outline"></i> 讨论</span>
            <ul>
              <el-button type="Info" icon="el-icon-edit" :disabled="set" @click="addComment(-1)">评论本章</el-button>
              <br></br>
              <li v-for="item in CommentLine" :key="item.id" >
                <div class="urcmcon">
                  <span class="urcmname">{{item.name}}:</span>
                  <!-- <span class="urcmcon">{{item.commentContent}}</span> -->
                  {{item.commentContent}}
                  <el-button type="text" class="replybtn" :disabled="set" @click="addComment(item.id)">回复</el-button>
                  <br></br>
                  <span class="urcmtime">{{item.commentTime}}</span>
                  <br><br/>
                </div>
                <ul>
                  <li v-for="it in item.responseContent" :key="it.id" >
                    <div class="urcmcon">
                      <span class="urcmname">{{it.name}}:</span>
                      <!-- <span class="urcmcon">{{it.commentContent}}</span> -->
                      {{it.commentContent}}
                      <br></br>
                      <span class="urcmtime">{{it.commentTime}}</span>
                      <br><br/>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-download"></i> 下载</span>
          <a :href="pdfsrc" download="课程pdf"><i class="el-icon-document">pdf资源下载</i></a>
        </el-tab-pane>
    </el-tabs>
    </el-aside>
  </el-container>
</el-container>  
</template>
<script>
export default {
  name: 'CourseLearning',
  data () {
    return {
      tusername: this.$store.getters.getUser.userName,
      set: false,
      courseName: 'Python',
      courseBar: '01',
      courseSrc: '',
      BarLine: [
        {id: 1, barName: '第一章', barUrl: 0},
        {id: 2, barName: '第二章', barUrl: 1},
        {id: 3, barName: '第三章', barUrl: 2},
        {id: 4, barName: '第四章', barUrl: 3}
      ],
      CommentLine: [
        {id: 0,
          name: 'gaoxing',
          commentContent: 'great',
          commentTime: '2004-08-11',
          responseContent: [
            {id: 0, name: 'chengtanning', commentContent: 'oh', commentTime: '2004-08-12'},
            {id: 1, name: 'chenjin', commentContent: 'this is not a great dos sisnf nbce jbe jceb ncjbf njibf cnejwfb ncjewif', commentTime: '2001-08-13'}
          ]},
        {id: 1,
          name: 'gaoxing',
          commentContent: 'great',
          commentTime: '2004-08-11',
          responseContent: [
            {id: 0, name: 'chengtanning', commentContent: 'oh', commentTime: '2004-08-12'}
          ]}
      ],
      pdfsrc: '../assets/img/python.jpg'
    }
  },
  created () {
    this.reqBarInfo()
    var authority = this.$store.getters.getUser.authority
    if (authority != 1) {
      this.set = true
    }
    // console.log(this.$route.params)
    // var learningurl = '/courseBar?cmd=' + this.$route.params.barId
  },
  watch: {
    $route: 'reqBarInfo',
    tusername: 'getSet'
  },
  methods: {
    getSet: function() {
      var authority = this.$store.getters.getUser.authority
      if (authority != 1) {
        this.set = true
      } else {
        this.set = false
      }
    },
    addComment (comId) {
      this.$prompt('请输入评论', 'Comment', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',
        //   message: '评论成功'
        // })
        this.$ajax({
          method: 'post',
          url: '/makeComment',
          data: {
            barId: this.$route.params.barId,
            name: this.$store.getters.getUser.userName,
            commentContent: value,
            commentId: comId
          }
        })
        .then(function (res) {
          var body = res.data
          var tempcom = body.comment
          var tempcomlist = []
          for (var i = 0; i < tempcom.length; i++) {
            var tres = tempcom[i].responseContent
            var tempres = []
            for (var j = 0; j < tres.length; j++) {
              tempres.push({id: tres[j].commentId, name: tres[j].name, commentContent: tres[j].commentContent, commentTime: tres[j].commentTime})
            }
            tempcomlist.push({id: tempcom[i].commentId, name: tempcom[i].name, commentContent: tempcom[i].commentContent, commentTime: tempcom[i].commentTime, responseContent: tempres})
          }
          this.CommentLine = tempcomlist
          this.$message({
            type: 'success',
            message: '评论成功'
          })
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    addCourse () {
      this.$ajax({
        method: 'post',
        url: '/addCourse',
        data: {
          barId: this.$route.params.barId,
          userName: this.$store.getters.getUser.userName
        }
      })
      .then(function (res) {
        var body = res.data
        var haveAdd = body.state
        if(haveAdd === 'true') {
          this.$message({
            type: 'success',
            message: '成功参加课程'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '课程已参加'
          })
        }
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    },
    reqBarInfo: function () {
      var url = '/courseBar?cmd=' + this.$route.params.barId
      console.log(url)
      var self = this
      this.$ajax.get(url).then(function (response) {
        var body = response.data
        self.courseName = body.courseName
        self.courseBar = body.barName
        self.courseSrc = body.path
        self.pdfsrc = body.PDF
        var tempbar = body.outline
        var templist = []
        for (var i = 0; i < tempbar.length; i++) {
          templist.push({id: i + 1, barName: tempbar[i].barName, barUrl: tempbar[i].barId})
        }
        self.BarLine = templist
        console.log(self.BarLine)
        var tempcom = body.comment
        var tcom = []
        for (var k = 0; k < tempcom.length; k++) {
          var tres = tempcom[k].responseContent
          var tempres = []
          for (var j = 0; j < tres.length; j++) {
            tempres.push({id: tres[j].commentId, name: tres[j].name, commentContent: tres[j].commentContent, commentTime: tres[j].commentTime})
          }
          tcom.push({id: tempcom[k].commentId, name: tempcom[k].name, commentContent: tempcom[k].commentContent, commentTime: tempcom[k].commentTime, responseContent: tempres})
        }
        self.CommentLine = tcom
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
  .el-header {
    background-color:white;
    color: #333;
    font-family: 'Georgia';
    margin-bottom: 1em;
    padding-bottom: 1em;
    text-align: center;
    /* line-height: 60px; */
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  .video {
    width: 100%;
    height: 100%;
  }
  .breadcrumb {
    float: left;
    font-family: 'Aveni';
    line-height: 100%;
    padding-top: 2em;
  }
  .bar-item {
    font-family: 'Aveni';
    color: gray;
    text-align: left;
  }
  .urcmname {
    color: #0081fa;
    font-size: 1.2em;
    float: left;
  }
  .urcmcon {
    color: #000000;
    word-break: break-all;
    overflow: hidden;
    text-align: left;
    /* float: left; */
  }
  .urcmtime {
    color: #828282;
    /* float: right; */
  }
  ul li{  
    list-style-type:none;  
  }
  .replybtn {
    float: right;
  }
  .adclsbtn {
    float: right;
    margin-top: 1em;

  }
</style>

