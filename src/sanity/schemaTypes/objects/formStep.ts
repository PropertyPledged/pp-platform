import { SplitVerticalIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const formStep = defineType({
   name: 'formStep',
   title: 'Form Step',
   type: 'object',
   icon: SplitVerticalIcon,
   fields: [
      defineField({
         name: 'stepTitle',
         title: 'Step Title',
         type: 'string',
         description: 'The title of this step (e.g., "Personal Details", "Property Information")',
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: 'fields',
         title: 'Fields',
         type: 'array',
         of: [{ type: 'formField' }],
         validation: (Rule) => Rule.required().min(1),
      }),
   ],
   preview: {
      select: {
         title: 'stepTitle',
         fields: 'fields',
      },
      prepare({ title, fields }) {
         return {
            title: title || 'Untitled Step',
            subtitle: `${fields?.length || 0} field(s)`,
         }
      },
   },
})
