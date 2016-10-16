
<template>
  <div class="login">
    <h1>{{ $t('ui.welcome') }}</h1>
    <div class="ui form error">
      <div class="ui segment">
        <div class="field">
          <div class="ui left icon input"><i class="user icon"></i>
            <input type="text" name="login" :placeholder="$t('ui.login')" @keyup.enter="login" v-model="user"/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input"><i class="lock icon"></i>
            <input type="password" name="password" :placeholder="$t('ui.password')" @keyup.enter="login" v-model="password"/>
          </div>
        </div>
        <button type="button" @click="login()" class="ui button teal submit">
          {{ $t('ui.auth') }}
        </button>
        <div class="ui message error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'semantic/form.css'
import 'semantic/form.js'
import 'semantic/message.css'
import 'semantic/segment.css'
import 'semantic/input.css'
import 'semantic/button.css'
import 'semantic/icon.css'

import router from '../router'
import socketAPI from '../api/socket-api'

export default {
  name: 'login',
  data () {
    return { error: null, user: '', password: '' }
  },
  methods: {
    login () {
      this.error = null
      let auth = { user: this.user, password: this.password }
      let url = process.env.MESSAGING_URL
      let room = 'Main'
      socketAPI.connect(url, {auth})
        .then(() => socketAPI.join(room))
        .then(() => router.push({name: 'chat', params: {room}}))
        .catch(error => {
          this.error = error instanceof Array ? error[0].reason : error.toString()
        })
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
</style>
