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
