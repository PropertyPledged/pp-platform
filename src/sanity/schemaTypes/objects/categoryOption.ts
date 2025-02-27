import { BulbOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryOption = defineType({
    name: 'categoryoption',
    title: 'Category Option',
    type: 'object',
    icon: BulbOutlineIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'question',
            type: 'string',
        }),
    ],
})
