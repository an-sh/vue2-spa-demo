
<template>
  <div class="users">
    <div v-if="loading" class="ui active">
      <div class="ui active loader"></div>
    </div>
    <div v-if="error" class="ui negative message">
      <i class="close icon"></i>
      <div class="header">
        {{ error }}
      </div>
    </div>
    <div v-if="!loading && !error" class="ui list userlist">
      <div v-for="user in users" class="item">
        {{ user }}
      </div>
    </div>
  </div>
</template>

<script>
import socketAPI from '../api/socket-api'

export default {
  name: 'users',
  data: function () {
    return { loading: true, error: null }
  },
  computed: {
    users: {
      get: function () {
        let users = this.$store.getters.getUsers(this.room)
        return users ? users.slice().sort() : []
      }
    },
    room: {
      get: function () {
        return this.$route.params.room
      }
    }
  },
  methods: {
    getData: function () {
      socketAPI.userlist(this.room)
               .then(() => { this.loading = false })
               .catch(err => {
                 this.error = err.toString()
                 this.loading = false
               })
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style scoped>
.users {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}

</style>
