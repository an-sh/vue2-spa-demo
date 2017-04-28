
import Vue from 'vue'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import initLocales from './i18n'
import initDirectives from './directives'

Vue.use(Vuetify)

sync(store, router)
initLocales()
initDirectives()

/* eslint-disable no-new */
new Vue({el: '#app', router, store, render: h => h('router-view')})
