
<template>
  <list :error="error" :loading="loading" :listdata="listdata">
    <template slot="item" scope="props">
      <v-list-item>{{ props.item }}</v-list-item>
    </template>
  </list>
</template>

<script>
import { listLoader, listGetter } from '../utils'
import List from './List'

export default {
  name: 'blacklist',
  components: { List },
  props: ['room'],
  data () {
    return { loading: true, error: null }
  },
  computed: {
    listdata () {
      return listGetter.call(this, 'getBlacklist')
    }
  },
  created () {
    listLoader.call(this, 'blacklist')
  }
}
</script>

<style scoped>
</style>
