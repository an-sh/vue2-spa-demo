import Vue from 'vue'

Vue.directive('auto-scroll', {
  inserted: function (el) {
    el.scrollTop = el.scrollHeight
  },
  update: function (el) {
    if (el.scrollHeight === el.scrollTop + el.clientHeight) {
      el.dataset.needsScroll = 'true'
    }
  },
  componentUpdated: function (el) {
    if (el.dataset.needsScroll) {
      el.scrollTop = el.scrollHeight
      el.dataset.needsScroll = ''
    }
  }
})
