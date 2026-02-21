import { SanityFormConfig } from '@/components/organisms/DynamicForm'
import { sanityFetch } from './fetch'
import { formQuery } from './queries'

/**
 * Fetches a custom form configuration from Sanity by its slug.
 * @param slug The exact slug of the form document in Sanity CMS
 * @returns The form configuration data matching `SanityFormConfig` or null if not found
 */
export async function getFormBySlug(slug: string): Promise<SanityFormConfig | null> {
   try {
      const form = await sanityFetch<SanityFormConfig>({
         query: formQuery,
         params: { slug },
      })

      return form || null
   } catch (error) {
      console.error(`Error fetching form "${slug}":`, error)
      return null
   }
}
