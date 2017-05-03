
<template>
  <v-container fluid>
    <v-row>
      <v-col xs12 sm12 md8 offset-md2>
        <v-card class="elevation-5 login">
          <v-card-title class="blue darken-2 white--text">
            {{ $t('ui.welcome') }}
          </v-card-title>
          <v-card-text>
            <v-text-field name="login" :label="$t('ui.login')" @keyup.native.enter="login" v-model="user"></v-text-field>
            <v-text-field name="password" type="password" :label="$t('ui.password')" @keyup.native.enter="login" v-model="password" persistent-hint :hint="$t('ui.phint')"></v-text-field>
          </v-card-text>
          <v-card-row actions>
            <v-dialog v-model="hasError" persistent class="errorDialog">
              <v-card >
                <v-card-row>
                  <v-card-text>
                    {{ error }}
                  </v-card-text>
                </v-card-row>
                <v-card-row actions>
                  <v-btn class="teal" @click.native="error = null">Ok</v-btn>
                </v-card-row>
              </v-card>
            </v-dialog>
            <v-btn class="teal" @click.native="login()">
              {{ $t('ui.auth') }}
            </v-btn>
          </v-card-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router'
import socketAPI from '../api/socket-api'

export default {
  name: 'login',
  data () {
    return { error: null, user: '', password: '' }
  },
  computed: {
    hasError () {
      return Boolean(this.error)
    }
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
@media only screen and (min-width: 992px) {
  .login {
    max-width: 576px;
    margin: auto;
  }
}
</style>
