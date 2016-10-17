import socketAPI from './api/socket-api'

export function listLoader (loader) {
  let room = this.$route.params.room
  return socketAPI[loader](room)
    .then(() => { this.loading = false })
    .catch(err => {
      this.error = err.toString()
      this.loading = false
    })
}

export function listGetter (getter) {
  let room = this.$route.params.room
  let items = this.$store.getters[getter](room)
  return items ? items.slice().sort() : []
}
