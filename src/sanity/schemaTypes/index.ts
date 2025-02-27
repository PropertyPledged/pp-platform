import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './documents/authorType'
import { categoryType } from './documents/categoryType'
import { pageType } from './documents/pageType'
import { postType } from './documents/postType'
import { siteSettings } from './documents/siteSettings'
import { suggestion } from './documents/suggestion'
import { blockContentType } from './objects/blockContentType'
import { categoryOption } from './objects/categoryOption'
import { response } from './objects/response'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Documents
        siteSettings,
        pageType,
        categoryType,
        postType,
        authorType,
        suggestion,

        // Objects
        response,
        categoryOption,
        blockContentType,
    ],
}
