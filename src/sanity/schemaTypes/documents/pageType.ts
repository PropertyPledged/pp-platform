import { defineType, defineField } from 'sanity'

export const pageType = defineType({
    title: 'Pages',
    name: 'page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
