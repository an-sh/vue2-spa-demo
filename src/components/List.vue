
<template>
  <div>
    <v-alert error :value="error">
      {{ error }}
    </v-alert>
    <div>
      <div v-if="loading" class="loader primary--text">
         <v-progress-circular indeterminate/>
      </div>
      <v-list v-if="!loading && !error">
        <slot name="item" v-for="item in listdata" :item="item"></slot>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['loading', 'error', 'listdata']
}
</script>

<style scoped>
.loader {
  margin: auto;
}
</style>
