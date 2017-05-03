
<template>
  <v-container fluid class="navigation-wrapper">
    <div class="navigation">
      <div>
        <v-tabs grow>
          <v-tab-item router :to="{name: 'messages'}" slot="activators">
            <v-icon>chat</v-icon>
          </v-tab-item>
          <v-tab-item router :to="{name: 'users'}" slot="activators">
            <v-icon>group</v-icon>
          </v-tab-item>
          <v-tab-item router :to="{name: 'blacklist'}" slot="activators">
            <v-icon>block</v-icon>
          </v-tab-item>
        </v-tabs>
      </div>
      <div class="page flexbox-item">
        <router-view class="page-content flexbox-item"></router-view>
      </div>
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
  overflow: auto;
}
</style>
