
import Vue from 'vue'
import Vuex from 'vuex'
import connection from './modules/connection'
import rooms from './modules/rooms'

import socketAPI from '../api/socket-api'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    connection,
    rooms
  },
  plugins: [socketAPI.plugin]
})

export default store
