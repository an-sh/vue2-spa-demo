
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Messages from './components/Messages'
import Users from './components/Users'
import Blacklist from './components/Blacklist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    name: 'main',
    children: [
      {
        path: '/login',
        component: Login,
        name: 'login'
      },
      {
        path: '/chat/:room',
        component: Navigation,
        name: 'chat',
        props: true,
        children: [
          {
            path: 'messages',
            component: Messages,
            name: 'messages',
            props: true
          },
          {
            path: 'users',
            component: Users,
            name: 'users',
            props: true
          },
          {
            path: 'blacklist',
            component: Blacklist,
            name: 'blacklist',
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter(
  { mode: 'history', linkActiveClass: 'active', routes })

export default router
