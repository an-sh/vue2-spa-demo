import socketAPI from './api/socket-api'

export function listLoader (loader) {
  let room = this.$route.params.room
  this.loading = true
  return socketAPI[loader](room)
    .then(() => { this.error = null })
    .catch(err => { this.error = err.toString() })
    .then(() => { this.loading = false })
}

export function listGetter (getter) {
  let room = this.$route.params.room
  let items = this.$store.getters[getter](room)
  return items ? items.slice().sort() : []
}
