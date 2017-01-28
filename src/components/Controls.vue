
<template>
  <div class="ui fluid action input">
    <input type="text" v-model.trim="message" :placeholder="$t('ui.message')" @keyup.enter="send"/>
    <button @click="send" class="ui icon teal button">
      <i class="send outline icon"></i>
    </button>
  </div>
</template>

<script>
import 'semantic/button.css'
import 'semantic/icon.css'

export default {
  name: 'controls',
  props: ['room'],
  data () {
    return { message: '' }
  },
  methods: {
    send () {
      if (this.message) {
        let roomName = this.room
        let message = {textMessage: this.message}
        this.$store.dispatch('sendMessage', {roomName, message})
        this.message = ''
      }
    }
  }
}
</script>

<style>
</style>
