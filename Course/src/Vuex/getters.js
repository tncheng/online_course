export default {
  getRegister: state => {
    return state.isShow
  },
  getUser: state => {
    return state.userInfo
  },
  getCurrentUrl: state => {
    return state.currentUrl
  }
  // getRegister (state) {
  //   return state.isShow
  // },
  // getUser (state) {
  //   return state.userInfo
  // }
}
