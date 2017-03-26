
import Client from 'ws-messaging/client'
import eventToPromise from 'event-to-promise'

import {
  CONNECT,
  DISCONNECT,
  ROOM_ADMINLIST,
  ROOM_BLACKLIST,
  ROOM_HISTORY,
  ROOM_JOIN,
  ROOM_LEAVE,
  ROOM_MESSAGE,
  ROOM_USERLIST
} from '../vuex/mutation-types'

class SocketAPI {
  constructor () {
    this.store = null
    this.socket = null
  }

  setEvents () {
    this.socket.on('close', ev => {
      console.log('Disconnected from server: ', ev)
      this.store.commit(DISCONNECT)
    })
    this.socket.on('connect', ([login]) => {
      console.log(`Current login is ${login}`)
      this.store.commit(CONNECT, { login })
    })
    this.socket.on('roomMessage', (roomName, message) => {
      this.store.commit(ROOM_MESSAGE, { roomName, message })
    })
    this.socket.on('roomAccessRemoved', (roomName) => {
      console.log(`Room ${roomName} access removed`)
      this.store.commit(ROOM_LEAVE, { roomName })
    })
    this.socket.on('connect', () => this.syncState())
    this.socket.on('error', error => console.error(error))
  }

  get plugin () {
    return store => { this.store = store }
  }

  syncState () {
    let rooms = this.store.getters.rooms
    rooms.forEach(room => this.join(room))
  }

  connect (url, opts) {
    let sameLogin = this.store.getters.login === opts.auth.user
    if (this.socket && this.socket.connected && sameLogin) {
      return Promise.resolve()
    }
    if (!this.socket || !sameLogin) {
      if (this.socket) { this.socket.close() }
      this.socket = new Client(url, opts)
      this.setEvents()
    } else {
      this.socket.reconnect()
    }
    return eventToPromise.multi(
      this.socket, ['connect'], ['error', 'close'])
  }

  cmd (name, ...args) {
    return this.socket.invoke(name, ...args).then(data => data[0])
  }

  join (roomName) {
    return this.cmd('roomJoin', roomName).then(() => {
      this.store.commit(ROOM_JOIN, { roomName })
    })
  }

  message (roomName, message) {
    return this.cmd('roomMessage', roomName, message)
  }

  history (roomName) {
    return this.cmd('roomRecentHistory', roomName).then(history => {
      this.store.commit(ROOM_HISTORY, { roomName, history })
    })
  }

  userlist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'userlist').then(list => {
      this.store.commit(ROOM_USERLIST, { roomName, list })
    })
  }

  blacklist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'blacklist').then(list => {
      this.store.commit(ROOM_BLACKLIST, { roomName, list })
    })
  }

  adminlist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'adminlist').then(list => {
      this.store.commit(ROOM_ADMINLIST, { roomName, list })
    })
  }
}

const socketAPI = new SocketAPI()

export default socketAPI
