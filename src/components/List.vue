
<template>
  <div class="roomlist">
    <div v-if="loading" class="ui active">
      <div class="ui active loader"></div>
    </div>
    <div v-if="error" class="ui negative message">
      <div class="header">
        <slot name="error"></slot>
      </div>
    </div>
    <div v-if="!loading && !error" class="ui list">
      <slot name="item" v-for="item in listdata" :item="item" class="item"></slot>
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
.roomlist {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}

</style>
