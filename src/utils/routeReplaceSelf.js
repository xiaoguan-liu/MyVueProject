/**
 * 路由替换(如果进行替换则上级路由强制为keep-alive)
 * @param component
 * @returns {*}
 */
export function RouteReplaceSelf (component) {
  return {
    name: 'RouteReplaceSelf',
    computed: {
      showChild () {
        const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1]
        return deepestMatchedRoute.instances.default !== this
      }
    },
    render (h) {
      // 为下层的路由增加标记
      if (this.showChild) { this.$route.meta.backPage = true }
      const child = this.showChild ? h('router-view') : h(component)
      return h('keep-alive', [child])
    }
  }
}
