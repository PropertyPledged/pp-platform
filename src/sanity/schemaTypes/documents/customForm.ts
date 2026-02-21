import { ClipboardIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const customForm = defineType({
   name: 'customForm',
   title: 'Custom Form',
   type: 'document',
   icon: ClipboardIcon,
   fields: [
      defineField({
         name: 'title',
         title: 'Form Title',
         type: 'string',
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
            source: 'title',
            maxLength: 96,
         },
      }),
      defineField({
         name: 'layoutType',
         title: 'Layout Type',
         type: 'string',
         options: {
            list: [
               { title: 'Standard (Single Page)', value: 'standard' },
               { title: 'Stepped (Wizard)', value: 'stepped' },
            ],
            layout: 'dropdown',
         },
         initialValue: 'standard',
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: 'steps',
         title: 'Form Steps',
         description: 'Define the steps and their fields. For a "Standard" form, simply use one step.',
         type: 'array',
         of: [{ type: 'formStep' }],
         validation: (Rule) => Rule.required().min(1),
      }),
   ],
   preview: {
      select: {
         title: 'title',
         subtitle: 'layoutType',
      },
      prepare({ title, subtitle }) {
         return {
            title: title || 'Untitled Form',
            subtitle: `Layout: ${subtitle === 'stepped' ? 'Stepped' : 'Standard'}`,
            icon: ClipboardIcon,
         }
      },
   },
})
