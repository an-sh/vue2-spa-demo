
<template>
  <v-card flat>
    <v-card-actions>
      <v-text-field single-line solo :label="$t('ui.message')" v-model.trim="message" append-icon="send" :append-icon-cb="send" @keydown.enter.native.stop="send" :toggle-keys="[]"></v-text-field>
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
        let message = {textMessage: this.message}
        this.sendMessage({roomName, message})
        this.message = ''
        /* hack for vuetify 0.15 input cleanup regression */
        try {
          this.$children[0].lazyValue = ''
        } catch (e) {}
      }
    },
    ...mapActions(['sendMessage'])
  }
}
</script>
