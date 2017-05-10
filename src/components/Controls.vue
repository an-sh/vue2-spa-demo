
<template>
  <v-card>
    <v-card-text class="py-2">
      <v-row>
        <v-text-field :label="$t('ui.message')" @keyup.native.enter="send" v-model.trim="message" single-line class="my-0 mx-2"></v-text-field>
        <v-btn class="teal" floating small @click.native="send">
          <v-icon>send</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
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
      }
    },
    ...mapActions(['sendMessage'])
  }
}
</script>

<style>
</style>
