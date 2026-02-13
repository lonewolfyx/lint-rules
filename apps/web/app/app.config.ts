export default defineAppConfig({
    title: 'Lint Rules',
    description: 'All-in-one lint rules hub: ESLint + plugins, Stylelint, Biome, Oxlint, Oxfmt and other linters — searchable & categorized.',
    github: {
        repo: 'https://github.com/lonewolfyx/lint-rules/',
    },
    navigation: {
        lint: {
            label: 'lint',
            items: [
                {
                    title: 'ESLint',
                    target: 'eslint',
                    website: 'https://eslint.org',
                    rules: 'https://eslint.org/docs/latest/rules/',
                    icon: 'vscode-icons:file-type-eslint2',
                },
                {
                    title: 'Oxlint',
                    target: 'oxlint',
                    website: 'https://oxc.rs',
                    rules: 'https://oxc.rs/docs/guide/usage/linter/rules.html',
                    icon: 'vscode-icons:file-type-oxlint',
                },
            ],
        },
    },
})
