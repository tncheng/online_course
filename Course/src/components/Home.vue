<template>
    <div id="homePage">
        <div class="content">
            <div class="adv">
                <h1 class="headline">在网上学习世界上最好的课程</h1>
            </div>
            <div class="addlink" >
                <el-button type="primary" :disabled="this.$store.getters.getUser.isLogin" v-on:click="onRegister" style="font-family:'Merriweather-Light',Georgia,serif;font-size:2em;padding:20px;">免费加入</el-button>
            </div>
        </div>
        <div class="recommendcourse">
          <div class="liheadline">
          顶级专项课程
          </div>
          <div>
            <el-carousel :interval="4000" type="card" height="10em" :autoplay="false">
              <el-carousel-item v-for="item in items" :key="item">
                <router-link :to="item.path" class="jumplink">             
               <img v-bind:src="item.src" width="100%" height="80%">
               <div width="100%" height="20%">{{item.name}}</div>
                </router-link>   
              </el-carousel-item>
            </el-carousel>            
          </div>
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      info: 'this is your home page',
      items: [
        {id: 0, src: require('../assets/img/Tensorflow.jpg'), name: 'Tensorflow', path: '/course/introduction/2'},
        {id: 1, src: require('../assets/img/skill.jpg'), name: '键盘操作技巧', path: '/course/introduction/5'},
        {id: 2, src: require('../assets/img/hadoop.jpg'), name: 'Hadoop', path: '/course/introduction/1'},
        {id: 3, src: require('../assets/img/finance.jpg'), name: 'Foundation of Personal Finance', path: '/course/introduction/7'}
      ]
    }
  },
  methods: {
    onRegister: function () {
      this.$store.commit('REGISTERP_PAGE', {x: true})
    }
  }
}
</script>

<style scoped>

.content {
  background-image: url(../assets/img/signup.jpg);
  min-height: 400px;
  padding: 0px;
}

.headline {
  padding-top: 50px;
  font-family: 'Merriweather-Light',Georgia,serif;
  font-size: 3em;
  color: white;
  line-height: 100px;
  margin: 0px;
}
.recommendcourse {
  font-size: 2.2em;
  font-family: "Times New Roman",Georgia,Serif;
  margin-top: 3%;
  margin-right: 5%;
  margin-left: 5%;
  text-align: center;
  background-color: white;
}
.liheadline {
  margin-bottom: 3%;
}
.jumplink {
  text-decoration: none;
  color: black
}
  .el-carousel__item h3 {
    color: white;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: white;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: white;
  }
</style>
