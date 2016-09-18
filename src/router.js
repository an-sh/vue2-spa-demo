
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login'
import Navigation from './components/Navigation'
import Messages from './components/Messages'
import Users from './components/Users'
import Blacklist from './components/Blacklist'

import store from './vuex/store'

Vue.use(VueRouter)

function requireConnection (route, redirect, next) {
  if (!store.getters.login) {
    redirect({ path: '/' })
  } else {
    next()
  }
}

const routes = [
  { path: '/',
    component: Login,
    name: 'login'
  },
  { path: '/chat/:room',
    component: Navigation,
    name: 'chat',
    beforeEnter: requireConnection,
    children: [
      { path: 'messages',
        component: Messages,
        name: 'messages'
      },
      { path: 'users',
        component: Users,
        name: 'users'
      },
      { path: 'blacklist',
        component: Blacklist,
        name: 'blacklist'
      }
    ]
  },
  { path: '/chat/:room',
    redirect: '/chat/:room/messages'
  }
]

const router = new VueRouter(
  { mode: 'history', linkActiveClass: 'active', routes })

export default router
