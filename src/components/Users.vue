
<template>
  <list :error="error" :loading="loading" :listdata="listdata"></list>
</template>

<script>
import socketAPI from '../api/socket-api'

import List from './List'

export default {
  name: 'users',
  components: { List },
  data () {
    return { loading: true, error: null }
  },
  computed: {
    listdata () {
      let users = this.$store.getters.getUsers(this.room)
      return users ? users.slice().sort() : []
    },
    room () {
      return this.$route.params.room
    }
  },
  methods: {
    getData () {
      socketAPI.userlist(this.room)
               .then(() => { this.loading = false })
               .catch(err => {
                 this.error = err.toString()
                 this.loading = false
               })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
</style>
