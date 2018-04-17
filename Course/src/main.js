// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './Vuex/store'
import VueResource from 'vue-resource'
import Axios from 'axios'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use(Axios)
Vue.prototype.$ajax = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
