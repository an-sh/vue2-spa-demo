
<template>
  <v-container fluid class="navigation-wrapper">
    <div class="navigation">
      <v-tabs grow dark>
        <v-tabs-bar>
          <v-tabs-item :to="{ path: 'messages' }">
            <v-icon>chat</v-icon>
          </v-tabs-item>
          <v-tabs-item :to="{ path: 'users' }">
            <v-icon>group</v-icon>
          </v-tabs-item>
          <v-tabs-item :to="{ path: 'blacklist' }">
            <v-icon>block</v-icon>
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs>
      <v-card flat class="page flexbox-item">
        <router-view class="page-content flexbox-item"></router-view>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import store from '../vuex/store'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'navigation',
  props: ['room'],
  computed: {
    ...mapGetters(['login'])
  },
  methods: {
    ...mapActions(['requestHistory'])
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.login) {
      next()
    } else if (from.name == null) {
      next('/')
    } else {
      next(false)
    }
  },
  mounted () {
    this.$router.replace({name: 'messages', params: { room: this.room }})
    this.requestHistory({ roomName: this.room })
  }
}
</script>

<style>
.flexbox-item {
  flex: 1;
}

.navigation-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
}

.navigation {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.page {
  display: flex;
  overflow-y: auto !important;
}

.page-content {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
