
import Vue from 'vue'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import { i18n } from './i18n'
import { autoScroll } from './directives'

Vue.use(Vuetify)
Vue.use(autoScroll)
sync(store, router)

/* eslint-disable no-new */
new Vue({ el: '#app', router, store, i18n, render: h => h('router-view') })
