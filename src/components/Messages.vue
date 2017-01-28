
<template>
  <div class="messages">
    <div class="messages-list ui feed" v-auto-scroll>
      <div v-for="msg in messages" :key="msg.id" class="event message">
        <div class="content">
          <div class="summary">
            <a class="user">
              {{ msg.author }}
            </a>
            <div class="date">
              {{ formatDate(msg.timestamp) }}
            </div>
          </div>
          <div class="text">
            {{ msg.textMessage }}
          </div>
        </div>
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <controls :room="room"></controls>
  </div>
</template>

<script>
import 'semantic/divider.css'
import 'semantic/feed.css'

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
      let ampm = hours >= 12 ? 'pm' : 'am'
      return `${hours}:${minutes}:${seconds} ${ampm}`
    },
    pad (num) {
      return num >= 10 ? num : `0${num}`
    }
  },
  computed: {
    messages: {
      get () {
        let history = this.$store.getters.getHistory(this.room)
        return history.slice().reverse()
      }
    }
  }
}
</script>

<style scoped>
.messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* word-wrap: break-word; */
}

.messages-list {
  flex: 1;
  overflow: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}
</style>
