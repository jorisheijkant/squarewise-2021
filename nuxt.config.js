// require('dotenv').config();
let routerBase = './';

if(process.env.NODE_ENV === 'demo') {
    routerBase = '/demo/squarewise/';
} else if(process.env.NODE_ENV === 'development') {
    routerBase = '/';
}

export default {
    target: 'static',

    head: {
        title: 'squarewise-annual',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{
            charset: 'utf-8'
        }, {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }, {
            hid: 'description',
            name: 'description',
            content: ''
        }],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }],
        script: [{
            "src": "https://cdn.polyfill.io/v2/polyfill.min.js?features=Element.prototype.classList"
        }, {
            "src": "https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"
        }]
    },

    css: ["vue-essential-slices/src/styles/styles.scss", "~/styles/style.scss"],

    plugins: [],

    components: true,

    buildModules: [],

    modules: [
        ["@nuxtjs/prismic", {
            "endpoint": "https://squarewise-2021.cdn.prismic.io/api/v2",
            "apiOptions": {
                "routes": [{
                    "type": "page",
                    "path": "/:uid"
                }]
            }
        }],
        ["nuxt-sm"],
        ["vue-scrollto/nuxt", {offset: -50}]
    ],

    build: {
        transpile: ["vue-slicezone", "nuxt-sm"]
    },

    storybook: {
        stories: ["~/slices/**/*.stories.js"]
    },

    router: {
        base: routerBase
    },

    ignore: ["**/*.stories.js"]
};