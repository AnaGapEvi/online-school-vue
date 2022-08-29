import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/HomePage'
import admin from '../components/admin/admin'
import teacher from '../components/teacher/teacher'
import user from '../components/user/user'
import Login from '../components/Login'
import news from '../components/News/News'
import Dashboard from '../components/Dashboard'
import subject from "../components/subject/subject";
import course from "../components/course/course"
import announcement from "../components/announcement/announcement";
import assignment from "../components/assignments/assignment";
import notification from "../components/notification/notification";
Vue.use(Router)
import VueExpandableImage from 'vue-expandable-image'
Vue.use(VueExpandableImage)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home-dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    ...admin,
    ...teacher,
    ...user,
    ...news,
    ...subject,
    ...course,
    ...announcement,
    ...assignment,
    ...notification

  ]
})
