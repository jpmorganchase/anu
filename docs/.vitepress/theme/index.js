// https://vitepress.dev/guide/custom-theme
import { h, defineAsyncComponent } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'


export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('card', defineAsyncComponent(() =>
      import('../../vue_components/card.vue')
    ))
    app.component('singleView', defineAsyncComponent(() =>
    import('../../vue_components/singleView.vue')
  ))
  app.component('inlineView', defineAsyncComponent(() =>
  import('../../vue_components/inlineView.vue')
))
  }
}
