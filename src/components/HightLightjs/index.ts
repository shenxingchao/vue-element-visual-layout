//引入代码高亮插件
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-light.css'

const directivePlugin: any = {
  install: function (app: any, options: any) {
    app.directive('highlightjs', {
      beforeMount(el: any, binding: any, vnode: any, oldVnode: any) {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
          hljs.highlightElement(block)
        })
      },
      mounted(el: any) {},
      beforeUpdate(el: any) {},
      updated(el: any) {},
      beforeUnmount(el: any) {},
      unmounted(el: any) {}
    })
  }
}
export default directivePlugin
