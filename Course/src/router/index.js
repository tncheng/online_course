import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Home'
import Content from '@/components/Content'
import UserInfo from '@/components/UserInfo'
import courseDetail from '@/components/CourseInfo'
import searchCourse from '@/components/SearchCourse'
import manager from '@/components/Manager'
import learning from '@/components/CourseLearning'
import manageBar from '@/components/ManageBar'
import helpCenter from '@/components/helpCenter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Content,
      children: [
        {
          path: '/browse/:name',
          name: 'detail',
          component: searchCourse
        }
      ]
    },
    {
      path: '/account',
      name: 'User',
      component: UserInfo
    },
    {
      path: '/course/introduction/:num',
      name: 'b',
      component: courseDetail
    },
    {
      path: '/search/:des',
      name: 'search',
      component: searchCourse
    },
    {
      path: '/management',
      name: 'manageement',
      component: manager
    },
    {
      path: '/management/:courseId',
      name: 'managebar',
      component: manageBar
    },
    {
      path: '/courseLearning/:barId',
      name: 'learning',
      component: learning
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: helpCenter
    }
  ]
})
