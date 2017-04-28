
<template>
  <div class="list-area px-2">
    <v-alert error :value="error">
      {{ error }}
    </v-alert>
    <div class="list">
      <div v-if="loading" class="loader primary--text">
         <v-progress-circular indeterminate/>
      </div>
      <v-list v-if="!loading && !error">
        <slot name="item" v-for="item in listdata" :item="item" class="item"></slot>
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
.list-area {
  display: flex;
  flex-direction: column;
}

.list {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}

.loader {
  margin: auto;
}
</style>
