/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    // arrowParens: 'always',
    // bracketSpacing: true,
    // jsxBracketSameLine: true,
    // printWidth: 300,
    // proseWrap: 'preserve',
    // semi: false,
    // singleQuote: true,
    // tabWidth: 2,
    // trailingComma: 'all',
    importOrder: [
        '^next/(.*)',
        '^@vercel/(.*)',
        '^react',
        '^@react/(.*)',
        '^@components/(.*)',
        '^[./]',
    ],
    importOrderSeparation: false,
    importOderSortSpecifiers: true,
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],
}

export default config
