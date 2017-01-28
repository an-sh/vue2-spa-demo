
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login'

const Navigation = r => {
  require.ensure([], () => r(require('./components/Navigation')), 'chat')
}

const Messages = r => {
  require.ensure([], () => r(require('./components/Messages')), 'chat')
}

const Users = r => {
  require.ensure([], () => r(require('./components/Users')), 'chat')
}

const Blacklist = r => {
  require.ensure([], () => r(require('./components/Blacklist')), 'chat')
}

Vue.use(VueRouter)

const routes = [
  { path: '/',
    component: Login,
    name: 'login'
  },
  { path: '/chat/:room',
    component: Navigation,
    name: 'chat',
    props: true,
    children: [
      { path: 'messages',
        component: Messages,
        name: 'messages',
        props: true
      },
      { path: 'users',
        component: Users,
        name: 'users',
        props: true
      },
      { path: 'blacklist',
        component: Blacklist,
        name: 'blacklist',
        props: true
      }
    ]
  },
  { path: '/chat/:room',
    redirect: '/chat/:room/messages'
  },
  { path: '*',
    redirect: '/' }
]

const router = new VueRouter(
  { mode: 'history', linkActiveClass: 'active', routes })

export default router
