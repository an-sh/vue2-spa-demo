
<template>
  <div class="navigation-content ui segments">
    <div class="ui segment">
      <div class="navigation-small ui two item menu">
        <div class="ui item"><i class="user icon teal"></i>{{ login }}</div>
        <div class="navigation-menu ui item dropdown">
          <div class="text">Menu</div><i class="dropdown icon"></i>
          <div class="ui menu">
            <a @click="navigate('messages')" data-value="messages" class="item">
              <i class="comments outline icon"></i>
              {{ $t('ui.messages') }}
            </a>
            <a @click="navigate('users')" data-value="users" class="item">
              <i class="users icon"></i>
              {{ $t('ui.users') }}
            </a>
            <a @click="navigate('blacklist')" data-value="blacklist" class="item">
              <i class="ban icon"></i>
              {{ $t('ui.blacklist') }}
            </a>
          </div>
        </div>
      </div>
      <div class="navigation-large ui four item menu">
        <div class="ui item"><i class="user icon teal"></i>{{ login }}</div>
        <router-link :to="{name: 'messages', params: {room: room}}" class="item">
          <i class="comments outline icon"></i>
          {{ $t('ui.messages') }}
        </router-link>
        <router-link :to="{name: 'users', params: {room: room}}" class="item">
          <i class="users icon"></i>
          {{ $t('ui.users') }}
        </router-link>
        <router-link :to="{name: 'blacklist', params: {room: room}}" class="item">
          <i class="ban icon"></i>
          {{ $t('ui.blacklist') }}
        </router-link>
      </div>
    </div>
    <div class="navigation-page ui basic segment">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* global $ */
import 'semantic/dropdown.css'
import 'semantic/dropdown.js'
import 'semantic/transition.css'
import 'semantic/transition.js'
import 'semantic/segment.css'
import 'semantic/menu.css'
import 'semantic/icon.css'
import 'semantic/loader.css'

export default {
  name: 'navigation',
  computed: {
    login: {
      get: function () {
        return this.$store.getters.login
      }
    },
    room: function () {
      return this.$route.params.room
    }
  },
  methods: {
    navigate: function (name) {
      this.$router.push({name, params: {room: this.room}})
    },
    changeRoute: function () {
      let name = this.$route.name
      $('.navigation-menu').dropdown('set selected', name)
    }
  },
  watch: {
    '$route': 'changeRoute'
  },
  mounted: function () {
    $('.ui.dropdown').dropdown()
    this.navigate('messages')
  }
}
</script>

<style scoped>
.navigation-content {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0;
  display: flex;
  flex: 1;
}

.navigation-page {
  display: flex;
  flex: 1;
}

.navigation-large {
  margin: 0 !important;
}

.navigation-small {
  margin: 0 !important;
}

@media (max-width: 767px) {
  .navigation-large {
    display: none !important;
  }
}

@media (min-width: 767px) {
  .navigation-small {
    display: none !important;
  }
}
</style>
