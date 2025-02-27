// import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    // icon: DocumentTextIcon,
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
            name: 'author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alttext',
                    type: 'string',
                    title: 'Alternative text',
                },
            ],
        }),
        defineField({
            name: 'categories',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: { type: 'category' },
                }),
            ],
        }),
        defineField({
            name: 'excerpt',
            type: 'text',
            title: 'Excerpt',
            description: 'A short description of the post',
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            type: 'blockContent',
        }),
        defineField({
            name: 'featured',
            type: 'boolean',
            title: 'Featured',
            description: 'Show this post on the front page',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: { title: string; author: string }) {
            return {
                ...selection,
                subtitle: selection?.author && `by ${selection?.author}`,
            }
        },
    },
})
