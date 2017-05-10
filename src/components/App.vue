
<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import store from '../vuex/store'

export default {
  name: 'app',
  beforeRouteEnter (to, from, next) {
    if (store.getters.login) {
      next({ name: 'chat' })
    } else {
      next()
    }
  },
  mounted () {
    this.$router.replace({ name: 'login' })
  }
}
</script>

<style>
.app {
  display: flex;
  width: 100%;
  height: 100%;
}

.list-avatar-letter {
  display: inline-block;
  font-size: 1em;
  width: 2.5em;
  height: 2.5em;
  line-height: 2.5em;
  text-align: center;
  border-radius: 50%;
  background: teal;
  vertical-align: middle;
  margin-right: 1em;
  color: white;
}
</style>
