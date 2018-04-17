import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
const state = {
  isShow: false,
  userInfo: {
    isLogin: false,
    userName: '',
    userEmail: '',
    authority: 1
  },
  currentUrl: ''
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
