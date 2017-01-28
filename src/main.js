
import '../semantic/dist/components/reset.css'
import '../semantic/dist/components/site.css'

import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import { initlocales } from './i18n'

import './directives'

sync(store, router)
initlocales()

/* eslint-disable no-new */
new Vue({el: '#app', router, store, render: h => h('router-view')})
