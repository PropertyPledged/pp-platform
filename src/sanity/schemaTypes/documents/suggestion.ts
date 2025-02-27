import { BulbOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const suggestion = defineType({
    name: 'suggestion',
    title: 'Suggestion',
    type: 'document',
    icon: BulbOutlineIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'options',
            type: 'array',
            of: [{ type: 'categoryoption' }],
        }),
        defineField({
            name: 'responses',
            type: 'array',
            of: [{ type: 'response' }],
        }),
    ],
})
