import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/icon',
        '@vueuse/nuxt',
    ],

    devtools: {
        enabled: true,
    },

    app: {
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
                // https://mathiasbynens.be/notes/touch-icons
                // https://iconifier.net
                // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
                // https://gist.github.com/nareshdevineni/bbbc45110a5b4b5a4a784a0a26c64bbf
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-57x57.png', sizes: '57x57' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-72x72.png', sizes: '72x72' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-76x76.png', sizes: '76x76' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-114x114.png', sizes: '114x114' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-120x120.png', sizes: '120x120' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-144x144.png', sizes: '144x144' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-152x152.png', sizes: '152x152' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    css: [
        '~/assets/css/main.css',
    ],
    compatibilityDate: '2026-02-12',

    vite: {
        plugins: [
            tailwindcss() as never,
        ],
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4, // 4, or 'tab'
                quotes: 'single', // or 'double'
            },
        },
    },

})
