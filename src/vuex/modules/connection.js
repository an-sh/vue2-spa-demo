
import {
  CONNECT,
  DISCONNECT
} from '../mutation-types'

const state = {
  login: null
}

const mutations = {
  [CONNECT] (state, { login }) {
    state.login = login
  },
  [DISCONNECT] (state) {
    state.login = null
  }
}

const getters = {
  login (state) {
    return state.login
  }
}

export default {
  state,
  mutations,
  getters
}
