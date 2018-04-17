<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="logo">
              <router-link class="logo" to="/index">Learning</router-link>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <el-input v-model="search" placeholder="搜索课程">
                <el-button v-on:click="oncatelog" slot="prepend" icon="el-icon-tickets"></el-button>
                <el-button v-on:click="onSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="tourist" v-if="this.$store.getters.getUser.isLogin != true">
              <!-- <div class="tourist" v-if="true"> -->
              <el-button v-on:click="onSignUp" plain>登陆</el-button>
              <el-button v-on:click="onRegister" type="primary">注册</el-button>
            </div>
            <div  v-else class="userInfo" >
              <span class="userPic"><img src="./assets/img/icon.jpg" height="40" width="40" style="border-radius:50%"></span>
              <el-dropdown>
                <span class="el-dropdown-link">{{getUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="getUserLevel == 1"><div v-on:click="onUserCourse">我的课程</div></el-dropdown-item>
                <el-dropdown-item v-else><div v-on:click="onManager">管理中心</div></el-dropdown-item>
                <el-dropdown-item><div @click="onHelp">帮助中心</div></el-dropdown-item>
                <el-dropdown-item><div v-on:click="onLogOut">退出</div></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- </div> -->
            <!-- <div class="tourist" v-if="(this.$store.getters.getUser.isLogin === false)"> -->
              <!-- <div style="display: inline-block;height:40px;"> -->
            </div>
          </el-col>
        </el-row>
        <div class="subPage">
          <div class="mainContent">
            <el-dialog title="Learning" :visible.sync="isLoginShow">
              <el-form :model="form1" @submit.prevent="submitLogin">
                <el-form-item label="邮箱" prop="email" :rules="[{required:true,message:'请输入邮箱地址',trigger:'blur'},{type:'email',message:'请输入正确的邮箱地址',trigger:'blur,change'}]">
                  <el-input v-model="form1.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="[{required:true,message:'请输入密码',trigger:'blur'}]">
                  <el-input type="password" v-model="form1.password" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div class="dialog-tip">
                <a href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=%E5%BF%98%E8%AE%B0%E5%AF%86%E7%A0%81%E6%80%8E%E4%B9%88%E5%8A%9E&oq=%25E5%25BF%2598%25E8%25AE%25B0%25E5%25AF%2586%25E7%25A0%2581%25E6%2580%258E%25E4%25B9%2588%25E5%258A%259E%25E3%2580%2581&rsv_pq=aabbcae8000327ea&rsv_t=1779EtTRaXs%2BVpapHoVtim9Tl26xPzAvzL55DEbUP%2FxvocYDgiLVcEPS%2BfQ&rqlang=cn&rsv_enter=0&rsv_sug3=2&rsv_sug1=2&rsv_sug7=100&prefixsug=%25E5%25BF%2598%25E8%25AE%25B0%25E5%25AF%2586%25E7%25A0%2581%25E6%2580%258E%25E4%25B9%2588%25E5%258A%259E&rsp=0&inputT=2078&rsv_sug4=2752&rsv_sug=1" style="float: right">忘记密码?</a>
              </div>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitLogin" >登陆</el-button>
              </div>
            </el-dialog>
            <el-dialog title="Learning" :visible.sync="$store.state.isShow">
              <el-form :model="form2">
                <el-form-item label="昵称" prop="name" :rules="[{required:true,message:'请输入昵称',trigger:'blur'}]">
                  <el-input v-model="form2.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :rules="[{required:true,message:'请输入邮箱地址',trigger:'blur'},{type:'email',message:'请输入正确的邮箱地址',trigger:'blur,change'}]">
                  <el-input v-model="form2.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="[{required:true,message:'请输入密码',trigger:'blur'}]">
                  <!-- <el-input type="password" v-model="form2.password" auto-complete="off"></el-input> -->
                  <el-input v-model="form2.password"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitSign" >注册</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <div class="pageFoot" >
          <div class="infoWeb">
            <p>
              <a class="home-logo" href="#">
                <span>Learning</span>
              </a>
            </p>
            <p>Learning 致力于普及全世界最好的教育，它与全球一流大学和机构合作提供在线课程。</p>
            <span style="font-size: 0.7em">© 2017 Learning. 保留所有权利。</span>
          </div>
          <div class="relavent">
          </div>
        </div>
      </el-footer>
            
    </el-container>


  <!-- <router-view/> -->

  
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      search: "",
      form1: {
        email: "",
        password: "",
      },
      form2: {
        name: "",
        email: "",
        password: "",
      },
      isLoginShow: false,
    };
  },
  computed: {
    getUserState: function() {
      return this.$store.getters.getUser.isLogin;
    },
    getUserName: function() {
      return this.$store.getters.getUser.userName;
    },
    getUserLevel: function() {
      return this.$store.getters.getUser.authority;
    }
  },
  created() {
    this.updateUser();
    console.log(localStorage.getItem("isLogin"));

  },

  // store,
  methods: {
    onSearch: function() {
      if (this.search === "") {
        this.$message.error("请输入搜索内容");
      } else {
        this.$router.push({ name: "search", params: { des: this.search } });
      }
      // console.log(this.$route)
    },
    oncatelog: function() {
      this.$router.push({ path: "/browse" });
    },
    onSignUp: function() {
      this.isLoginShow = true;
    },
    onCloseSign: function() {
      this.isLoginShow = false;
    },
    onRegister: function() {
      this.$store.commit("REGISTERP_PAGE", { x: true });
      console.log(this.$store.getters.getUser);
      // this.$store.getters.getRegister()
    },
    onCloseRegist: function() {
      this.$store.commit("REGISTERP_PAGE", { x: false });
    },
    submitLogin: function() {
      var user = this.form1;
      var self = this;
      this.$ajax
        .post("/course?cmd=signup", user)
        // .post("/course")
        .then(function(response) {
          var userInfo = response.data;
          if (response.data.isLogin === true) {
            self.$store.commit("USERLOGIN", {
              state: userInfo.isLogin,
              name: userInfo.userName,
              email: userInfo.userEmail,
              authority: userInfo.authority
            });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("userName", userInfo.userName);
            localStorage.setItem("userEmail", userInfo.userEmail);
            localStorage.setItem("authority", userInfo.authority);
            self.onCloseSign();
            console.log('submit');
          } else {
            self.fail("请输入正确用户名或密码");
            console.log("请输入正确的用户名或密码");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitSign: function() {
      var NewUser = this.form2;
      var self = this;
      this.$ajax
        .post("/course?cmd=regist", NewUser)
        .then(function(response) {
          var nUser = response.data;
          if (response.data.state === true) {
            self.$store.commit("USERLOGIN", {
              state: nUser.state,
              name: nUser.name,
              email: nUser.email,
              authority: 1
            });
            self.onCloseRegist();
          } else {
            if (nUser.errorReason === "name") {
              self.fail("姓名重复");
            } else {
              self.fail("邮箱重复");
            }
          }
          console.log(response.data.state);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onUserCourse: function() {
      this.$router.push({ path: "/account" });
    },
    onManager: function() {
      this.$router.push({ path: "/management" });
    },
    onLogOut: function() {
      localStorage.setItem("isLogin", false);
      // localStorage.setItem("userName", );
      // localStorage.setItem("userEmail", );
      // localStorage.setItem("authority", );
      this.$store.commit("USERLOGIN", {
        state: false,
        // name: "none",
        // email: "none"
      });
      
    },
    onHelp: function () {
      this.$router.push({path: '/helpCenter'})
    },
    fail: function(info) {
      this.$message({
        message: info,
        type: "warning"
      });
    },
    updateUser: function() {
      var flag = localStorage.getItem("isLogin")==="true" ? true : false;
      this.$store.commit("USERLOGIN", {
        state: flag,
      });
      if(localStorage.getItem("isLogin") === "true"){
        this.$store.commit("USERLOGIN", {
          state: flag,
          name: localStorage.getItem("userName"),
          email: localStorage.getItem("userEmail"),
          authority: parseInt(localStorage.getItem("authority"))
      });
      }
      
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.el-header {
  text-align: center;
  border-bottom: 1px #ccc solid;
}

.el-main {
  text-align: center;
  min-height: 500px;
  padding: 0px;
  margin: 0px;
}

.el-col {
  border-radius: 4px;
  padding-top: 6px;
}
.userInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown {
  margin-left: 10px;
}
.tourist {
  /* display: none; */
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.pageFoot {
  border-top: 1px #ccc solid;
  padding: 5px;
}
.infoWeb,
.relavent {
  width: 50%;
}
.logo {
  text-align: center;
  width: 100%;
  font-size: 1.2em;
  color: #286cb5;
  text-decoration: none;
  font-weight: bolder;
}
</style>
