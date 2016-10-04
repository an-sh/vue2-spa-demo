
import io from 'socket.io-client'
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
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server')
      this.store.commit(DISCONNECT)
    })
    this.socket.on('loginConfirmed', (login) => {
      console.log(`Current login is ${login}`)
      this.store.commit(CONNECT, { login })
    })
    this.socket.on('roomMessage', (roomName, message) => {
      this.store.commit(ROOM_MESSAGE, { roomName, message })
    })
    this.socket.on('roomAccessRemoved', (roomName) => {
      console.log('Room access removed')
      this.store.commit(ROOM_LEAVE, { roomName })
    })
    this.socket.on('loginRejected', () => {
      console.log('Login rejected')
      this.socket.close()
      this.socket = null
    })
    this.socket.on('error', (...args) => {
      console.error(...args)
    })
  }

  vuexPlugin () {
    return store => { this.store = store }
  }

  syncState () {
    let rooms = this.store.getters.rooms
    console.log(rooms)
    rooms.forEach(room => this.join(room).then(() => this.adminlist(room)))
  }

  connect (url, opts) {
    if (this.socket) { return Promise.resolve() }
    this.socket = io.connect(url, opts)
    this.setEvents()
    this.socket.on('loginConfirmed', () => this.syncState())
    return eventToPromise.multi(
      this.socket, ['loginConfirmed'], ['error', 'loginRejected'])
  }

  ensureState (url, opts, room) {
    return this.connect(url, opts)
      .then(() => this.join(room))
      .then(() => this.adminlist(room))
  }

  cmd (name, ...args) {
    return new Promise((resolve, reject) => {
      this.socket.emit(name, ...args, (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
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
    return this.cmd('roomHistoryGet', roomName).then((history) => {
      this.store.commit(ROOM_HISTORY, { roomName, history })
    })
  }

  userlist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'userlist').then((list) => {
      this.store.commit(ROOM_USERLIST, { roomName, list })
    })
  }

  blacklist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'blacklist').then((list) => {
      this.store.commit(ROOM_BLACKLIST, { roomName, list })
    })
  }

  adminlist (roomName) {
    return this.cmd('roomGetAccessList', roomName, 'adminlist').then((list) => {
      this.store.commit(ROOM_ADMINLIST, { roomName, list })
    })
  }

}

const socketAPI = new SocketAPI()

export default socketAPI
