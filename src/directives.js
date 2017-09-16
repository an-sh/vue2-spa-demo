
export function autoScroll (Vue, options) {
  Vue.directive('auto-scroll', {
    inserted (el) {
      el.scrollTop = el.scrollHeight
    },
    update (el) {
      if (el.scrollHeight === el.scrollTop + el.clientHeight) {
        el.dataset.needsScroll = 'true'
      }
    },
    componentUpdated (el) {
      if (el.dataset.needsScroll) {
        el.scrollTop = el.scrollHeight
        el.dataset.needsScroll = ''
      }
    }
  })
}
