
<template>
  <div class="messages">
    <div class="messages-list" v-auto-scroll>
      <div v-for="msg in messages" :key="msg.id">
        <div class="message ma-2">
          <div class="content">
            <v-chip small class="green lighten-4">
              <v-avatar class="teal avatar">
                <span>{{ avatarLetter(msg.author) }}</span>
              </v-avatar>
              {{ msg.author }}
            </v-chip>
            <span class="message-date grey--text">{{ formatDate(msg.timestamp) }}</span>
            <div class="mx-2">{{ msg.textMessage }}</div>
          </div>
        </div>
      </div>
    </div>
    <controls :room="room"></controls>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { avatarLetter } from '../utils'
import Controls from './Controls'

export default {
  name: 'messages',
  components: { Controls },
  props: ['room'],
  methods: {
    formatDate (ts) {
      let date = new Date(ts)
      let hours = this.pad(date.getHours())
      let minutes = this.pad(date.getMinutes())
      let seconds = this.pad(date.getSeconds())
      return `${hours}:${minutes}:${seconds}`
    },
    pad (num) {
      return num >= 10 ? num : `0${num}`
    },
    avatarLetter
  },
  computed: {
    messages: {
      get () {
        let history = this.getHistory(this.room)
        return history.slice().reverse()
      }
    },
    ...mapGetters(['getHistory'])
  }
}
</script>

<style scoped>
.messages {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-date {
  font-size: 80%;
}

.avatar {
  height: 26px!important;
  width: 26px!important;
}
</style>
