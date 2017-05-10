
<template>
  <div class="messages">
    <div class="messages-list" v-auto-scroll>
      <div v-for="msg in messages" :key="msg.id">
        <div class="message ma-2">
          <div class="content">
            <span class="blue--text" href="">
              {{ msg.author }}
            </span>
            <span class="message-date grey--text">
              {{ formatDate(msg.timestamp) }}
            </span>
            <br>
            <span>
              {{ msg.textMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <controls :room="room"></controls>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }
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
.message {

}
.messages {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.messages-list {
  flex: 1;
  overflow: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}

.message-date {
  font-size: 80%;
}
</style>
