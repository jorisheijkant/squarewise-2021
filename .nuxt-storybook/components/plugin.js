import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Navigation: () => import('../../components/navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c)),
  SquarewiseFooter: () => import('../../components/squarewise-footer.vue' /* webpackChunkName: "components/squarewise-footer" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
