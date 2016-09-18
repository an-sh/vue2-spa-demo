
import '../semantic/dist/components/reset.css'
import '../semantic/dist/components/site.css'

import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import { initlocales } from './i18n'

require('./directives')

sync(store, router)
initlocales()

function render (createElement) {
  return createElement('router-view')
}

const app = new Vue({router, store, render})

app.$mount('#app')
