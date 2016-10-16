
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
    <controls></controls>
  </div>
</template>

<script>
import 'semantic/divider.css'
import 'semantic/feed.css'

import Controls from './Controls'

export default {
  name: 'messages',
  components: { Controls },
  methods: {
    formatDate (ts) {
      let date = new Date(ts)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      let ampm = hours >= 12 ? 'pm' : 'am'
      return `${hours}:${minutes}:${seconds} ${ampm}`
    }
  },
  computed: {
    messages: {
      get () {
        let history = this.$store.getters.getHistory(this.$route.params.room)
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
