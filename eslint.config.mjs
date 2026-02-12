import antfu from '@antfu/eslint-config'
import nuxt from './apps/web/.nuxt/eslint.config.mjs'

export default antfu({
    pnpm: true,
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
        'vue/block-order': ['error', {
            order: ['template', 'script', 'style'],
        }],
    },
}).append(nuxt)
