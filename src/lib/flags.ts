import { flag } from '@vercel/flags/next'

export const disableCore = flag({
    key: 'disable-core',
    decide: () => true,
}) // default: false
