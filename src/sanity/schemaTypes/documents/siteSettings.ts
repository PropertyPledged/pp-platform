import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'keywords',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'navigation',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'page' }],
                }),
            ],
        }),
    ],
})
