
<template>
  <list :error="error" :loading="loading" :listdata="listdata"></list>
</template>

<script>
import socketAPI from '../api/socket-api'

import List from './List'

export default {
  name: 'blacklist',
  components: { List },
  data () {
    return { loading: true, error: null }
  },
  computed: {
    listdata () {
      let users = this.$store.getters.getBlacklist(this.room)
      return users ? users.slice().sort() : []
    },
    room () {
      return this.$route.params.room
    }
  },
  methods: {
    getData () {
      socketAPI.blacklist(this.room)
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
