
import Vue from 'vue'
import socketAPI from '../../api/socket-api'

import {
  ROOM_JOIN,
  ROOM_LEAVE,
  ROOM_MESSAGE,
  ROOM_HISTORY,
  ROOM_USERLIST,
  ROOM_BLACKLIST,
  ROOM_ADMINLIST
} from '../mutation-types'

const state = {
  rooms: {}
}

class Room {
  constructor (name) {
    this.name = name
    this.messages = []
    this.userlist = []
    this.blacklist = []
    this.adminlist = []
  }
  mergeHistory (history) {
    this.messages = history
  }
  addMessage (message) {
    this.messages.unshift(message)
  }
}

const mutations = {
  [ROOM_JOIN] (state, { roomName }) {
    if (!state.rooms[roomName]) {
      Vue.set(state.rooms, roomName, new Room())
    }
  },
  [ROOM_LEAVE] (state, { roomName }) {
    Vue.delete(state.rooms, roomName)
  },
  [ROOM_MESSAGE] (state, { roomName, message }) {
    let room = state.rooms[roomName]
    if (room) {
      room.addMessage(message)
    }
  },
  [ROOM_HISTORY] (state, { roomName, history }) {
    let room = state.rooms[roomName]
    if (room) {
      room.mergeHistory(history)
    }
  },
  [ROOM_USERLIST] (state, { roomName, list }) {
    let room = state.rooms[roomName]
    if (room) {
      room.userlist = list
    }
  },
  [ROOM_BLACKLIST] (state, { roomName, list }) {
    let room = state.rooms[roomName]
    if (room) {
      room.blacklist = list
    }
  },
  [ROOM_ADMINLIST] (state, { roomName, list }) {
    let room = state.rooms[roomName]
    if (room) {
      room.adminlist = list
    }
  }
}

const getters = {
  getHistory: function (state) {
    return function (roomName) {
      let room = state.rooms[roomName]
      if (!room) return []
      return room.messages
    }
  },

  getUsers: function (state) {
    return function (roomName) {
      let room = state.rooms[roomName]
      if (!room) return []
      return room.userlist
    }
  },

  getBlacklist: function (state) {
    return function (roomName) {
      let room = state.rooms[roomName]
      if (!room) return []
      return room.blacklist
    }
  }
}

const actions = {
  sendMessage: function (state, {roomName, message}) {
    return socketAPI.message(roomName, message)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
