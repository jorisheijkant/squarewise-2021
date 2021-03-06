import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_3b56da05 from 'nuxt_plugin_plugin_3b56da05' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_vuescrollto_29f48d0e from 'nuxt_plugin_vuescrollto_29f48d0e' // Source: ./vue-scrollto.js (mode: 'client')
import nuxt_plugin_smresolver_42d5630c from 'nuxt_plugin_smresolver_42d5630c' // Source: ./prismic/sm-resolver.js (mode: 'all')
import nuxt_plugin_prismic_2b220c99 from 'nuxt_plugin_prismic_2b220c99' // Source: ./prismic/plugins/prismic.js (mode: 'all')
import nuxt_plugin_prismiccomponents_2561dc32 from 'nuxt_plugin_prismiccomponents_2561dc32' // Source: ./prismic/plugins/prismic-components.js (mode: 'all')
import nuxt_plugin_googleanalytics_daf856aa from 'nuxt_plugin_googleanalytics_daf856aa' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_lazyload_10f2b7b2 from 'nuxt_plugin_lazyload_10f2b7b2' // Source: ../plugins/lazyload.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Squarewise impactrapportage 2020","htmlAttrs":{"lang":"nl","prefix":"og: http:\u002F\u002Fogp.me\u002Fns#"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Squarewise is inmiddels twee jaar een sociale onderneming. Daar zijn we trots op! Aan de hand van deze impactrapportage blikken we terug op onze gemaakte impact en delen we geleerde lessen."},{"hid":"ogtitle","name":"og:title","content":"Squarewise impactrapportage 2020"},{"hid":"ogdescription","name":"og:description","content":"Squarewise is inmiddels twee jaar een sociale onderneming. Daar zijn we trots op! Aan de hand van deze impactrapportage blikken we terug op onze gemaakte impact en delen we geleerde lessen."},{"hid":"ogimage","name":"og:image","content":"https:\u002F\u002Fapi.jorisheijkant.nl\u002Fdemo\u002Fsquarewise\u002Fthumbnail.jpg"},{"hid":"ogurl","name":"og:url","content":"https:\u002F\u002Fapi.jorisheijkant.nl\u002Fdemo\u002Fsquarewise\u002F"},{"hid":"ogsitename","name":"og:site_name","content":"Squarewise impactrapportage 2020"},{"hid":"twittercard","name":"twitter:card","content":"summary_large_image"},{"hid":"twittersite","name":"twitter:site","content":"@Squarewise"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"favicon.ico"},{"rel":"apple-touch-icon","sizes":"180x180","href":"apple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"favicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"favicon-16x16.png"},{"rel":"manifest","href":"site.webmanifest"}],"script":[{"src":"https:\u002F\u002Fcdn.polyfill.io\u002Fv2\u002Fpolyfill.min.js?features=Element.prototype.classList"},{"src":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Ffocus-visible@5.0.2\u002Fdist\u002Ffocus-visible.min.js"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_3b56da05 === 'function') {
    await nuxt_plugin_plugin_3b56da05(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuescrollto_29f48d0e === 'function') {
    await nuxt_plugin_vuescrollto_29f48d0e(app.context, inject)
  }

  if (typeof nuxt_plugin_smresolver_42d5630c === 'function') {
    await nuxt_plugin_smresolver_42d5630c(app.context, inject)
  }

  if (typeof nuxt_plugin_prismic_2b220c99 === 'function') {
    await nuxt_plugin_prismic_2b220c99(app.context, inject)
  }

  if (typeof nuxt_plugin_prismiccomponents_2561dc32 === 'function') {
    await nuxt_plugin_prismiccomponents_2561dc32(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_daf856aa === 'function') {
    await nuxt_plugin_googleanalytics_daf856aa(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lazyload_10f2b7b2 === 'function') {
    await nuxt_plugin_lazyload_10f2b7b2(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
