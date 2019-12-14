
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

const rooms = {}

class Room {
  constructor (name) {
    this.name = name
    this.messages = []
    this.userlist = []
    this.blacklist = []
    this.adminlist = []
    this.hasHistory = false
  }
  mergeHistory (history) {
    if (!this.hasHistory) {
      this.messages.push(...history)
      this.hasHistory = true
    }
  }
  addMessage (message) {
    this.messages.unshift(message)
  }
}

const mutations = {
  [ROOM_JOIN] (state, { roomName }) {
    if (!rooms[roomName]) {
      Vue.set(rooms, roomName, new Room())
    }
  },
  [ROOM_LEAVE] (state, { roomName }) {
    Vue.delete(rooms, roomName)
  },
  [ROOM_MESSAGE] (state, { roomName, message }) {
    let room = rooms[roomName]
    if (room) {
      room.addMessage(message)
    }
  },
  [ROOM_HISTORY] (state, { roomName, history }) {
    let room = rooms[roomName]
    if (room) {
      room.mergeHistory(history)
    }
  },
  [ROOM_USERLIST] (state, { roomName, list }) {
    let room = rooms[roomName]
    if (room) {
      room.userlist = list
    }
  },
  [ROOM_BLACKLIST] (state, { roomName, list }) {
    let room = rooms[roomName]
    if (room) {
      room.blacklist = list
    }
  },
  [ROOM_ADMINLIST] (state, { roomName, list }) {
    let room = rooms[roomName]
    if (room) {
      room.adminlist = list
    }
  }
}

const getters = {
  rooms (state) {
    return Object.keys(rooms)
  },

  getHistory (state) {
    return function (roomName) {
      let room = rooms[roomName]
      if (!room) return []
      return room.messages
    }
  },

  getUsers (state) {
    return function (roomName) {
      let room = rooms[roomName]
      if (!room) return []
      return room.userlist
    }
  },

  getBlacklist (state) {
    return function (roomName) {
      let room = rooms[roomName]
      if (!room) return []
      return room.blacklist
    }
  }
}

const actions = {
  sendMessage (state, { roomName, message }) {
    return socketAPI.message(roomName, message)
  },
  requestHistory (state, { roomName }) {
    return socketAPI.history(roomName)
  }
}

export default {
  state: rooms,
  mutations,
  getters,
  actions
}
