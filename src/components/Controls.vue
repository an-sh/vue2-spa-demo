
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
  data () {
    return {
      message: ''
    }
  },
  methods: {
    send: function () {
      if (this.message) {
        let roomName = this.$route.params.room
        this.$store.dispatch('sendMessage', {roomName, message: {textMessage: this.message}})
        this.message = ''
      }
    }
  }
}
</script>

<style>
</style>
