
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
  name: 'users',
  components: { List },
  props: ['room'],
  data () {
    return { loading: true, error: null }
  },
  computed: {
    listdata () {
      return listGetter.call(this, 'getUsers')
    }
  },
  created () {
    listLoader.call(this, 'userlist')
  }
}
</script>

<style scoped>
</style>
