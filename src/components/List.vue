
<template>
  <div>
    <v-alert error :value="error">
      {{ error }}
    </v-alert>
    <div v-if="loading" class="loader primary--text loading-container">
      <v-progress-circular indeterminate/>
    </div>
    <v-list v-if="!loading && !error">
      <slot name="item" v-for="item in listdata" :item="item"></slot>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['loading', 'error', 'listdata']
}
</script>

<style scoped>
.loading-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
