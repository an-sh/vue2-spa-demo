
<template>
  <v-card flat>
    <v-card-actions>
      <v-text-field single-line solo :label="$t('ui.message')" v-model.trim="message" append-icon="send" @click:append="send" @keydown.enter.native="send"></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

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
        let message = { textMessage: this.message }
        this.sendMessage({ roomName, message })
        this.message = ''
      }
    },
    ...mapActions(['sendMessage'])
  }
}
</script>
