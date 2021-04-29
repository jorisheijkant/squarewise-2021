// require('dotenv').config();
let routerBase = './';
let ogUrl = '';

if (process.env.NODE_ENV === 'demo') {
    routerBase = '/demo/squarewise/';
    ogUrl = 'https://api.jorisheijkant.nl/demo/squarewise/';
} else if (process.env.NODE_ENV === 'development') {
    routerBase = '/';
    ogUrl = 'https://api.jorisheijkant.nl/demo/squarewise/';
} else if(process.env.NODE_ENV === 'production') {
    routerBase = '/rapportages/impactrapportage-2020/';
    ogUrl = 'https://squarewise.com/rapportages/impactrapportage-2020/';
}

let title = "Squarewise impactrapportage 2020";
let description = "Squarewise is inmiddels twee jaar een sociale onderneming. Daar zijn we trots op! Aan de hand van deze impactrapportage blikken we terug op onze gemaakte impact en delen we geleerde lessen.";

export default {
    ssr: true,

    target: 'static',

    head: {
        title: title,
        htmlAttrs: {
            lang: "nl",
            prefix: "og: http://ogp.me/ns#"
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: description},
            {hid: 'ogtitle', name: 'og:title', content: title},
            {hid: 'ogdescription', name: 'og:description', content: description},
            {hid: 'ogimage', name: 'og:image', content: `${ogUrl}thumbnail.jpg`},
            {hid: 'ogurl', name: 'og:url', content: ogUrl},
            {hid: 'ogsitename', name: 'og:site_name', content: title},
            {hid: 'twittercard', name: 'twitter:card', content: 'summary_large_image'},
            {hid: 'twittersite', name: 'twitter:site', content: '@Squarewise'}
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: 'favicon.ico'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: 'apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: 'favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: 'favicon-16x16.png'
            },
            {
                rel: 'manifest',
                href: 'site.webmanifest'
            }],
        script: [{
            "src": "https://cdn.polyfill.io/v2/polyfill.min.js?features=Element.prototype.classList"
        }, {
            "src": "https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"
        }]
    },

    css: ["essential-slices/src/styles/styles.scss", "~/styles/style.scss"],

    plugins: [
        {src: '~/plugins/lazyload.js', ssr: false}
    ],

    components: true,

    buildModules: [
        "@nuxtjs/google-analytics"
    ],

    googleAnalytics: {
        id: "UA-195920783-1"
    },

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