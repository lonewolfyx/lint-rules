import antfu from '@antfu/eslint-config'
import nuxt from './apps/web/.nuxt/eslint.config.mjs'

export default antfu({
    pnpm: true,
    vue: {
        overrides: {
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style'],
            }],
        },
    },
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    yaml: {
        overrides: {
            'yaml/indent': ['error', 2],
        },
    },
    rules: {
        'antfu/top-level-function': 'off',
        'no-console': 'off',
        'e18e/prefer-static-regex': 'off',
    },
}).append(nuxt)
