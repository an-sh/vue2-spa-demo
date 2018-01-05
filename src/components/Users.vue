
<template>
  <list :error="error" :loading="loading" :listdata="listdata">
    <template slot="item" slot-scope="props">
      <v-list-tile @click="">
        <v-list-tile-avatar>
          <span class="list-avatar-letter white--text teal">
            {{ avatarLetter(props.item) }}
          </span>
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{ props.item }}
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </list>
</template>

<script>
import { avatarLetter } from '../utils'
import socketAPI from '../api/socket-api'
import List from './List'

export default {
  name: 'users',
  components: { List },
  props: ['room'],
  data () {
    return { loading: true, error: null }
  },
  computed: {
    listdata () {
      let items = this.$store.getters.getUsers(this.room)
      return items ? items.slice().sort() : []
    }
  },
  methods: {
    avatarLetter
  },
  created () {
    this.loading = true
    return socketAPI.userlist(this.room)
      .then(() => { this.error = null })
      .catch(err => { this.error = err.toString() })
      .then(() => { this.loading = false })
  }
}
</script>
