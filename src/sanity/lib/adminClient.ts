import { env } from '@/env'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const adminClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    stega: {
        studioUrl: '/studio',
    },
    token: env.SANITY_VIEWER_TOKEN,
})
