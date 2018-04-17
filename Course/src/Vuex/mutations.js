export default {
  REGISTERP_PAGE: (state, op) => {
    state.isShow = op.x
  },
  USERLOGIN: (state, user) => {
    state.userInfo.isLogin = user.state
    state.userInfo.userName = user.name
    state.userInfo.userEmail = user.email
    state.userInfo.authority = user.authority
    console.log('保存')
  },
  SET_CURRENT_URL: (state, u) => {
    state.currentUrl = u.url
  }
}
