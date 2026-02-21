import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const formField = defineType({
   name: 'formField',
   title: 'Form Field',
   type: 'object',
   icon: DocumentTextIcon,
   fields: [
      defineField({
         name: 'name',
         title: 'Field Name (ID)',
         type: 'string',
         description: 'The internal ID/name for this field (e.g., firstName). Must be unique within the form. No spaces.',
         validation: (Rule) =>
            Rule.required()
               .regex(/^[a-zA-Z0-9_]+$/)
               .error('Only alphanumeric characters and underscores are allowed'),
      }),
      defineField({
         name: 'label',
         title: 'Label',
         type: 'string',
         description: 'The visible label for this field',
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: 'fieldType',
         title: 'Field Type',
         type: 'string',
         options: {
            list: [
               { title: 'Text (Single Line)', value: 'string' },
               { title: 'Text Area (Multi-line)', value: 'text' },
               { title: 'Checkbox (Boolean)', value: 'boolean' },
               { title: 'Select Dropdown', value: 'select' },
               { title: 'Radio Group', value: 'radio' },
            ],
            layout: 'radio',
         },
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: 'required',
         title: 'Is Required?',
         type: 'boolean',
         initialValue: false,
      }),
      defineField({
         name: 'placeholder',
         title: 'Placeholder Text',
         type: 'string',
         hidden: ({ parent }) => parent?.fieldType === 'boolean' || parent?.fieldType === 'radio',
      }),
      defineField({
         name: 'options',
         title: 'Options (for Select / Radio types)',
         type: 'array',
         of: [{ type: 'string' }],
         hidden: ({ parent }) => parent?.fieldType !== 'select' && parent?.fieldType !== 'radio',
         validation: (Rule) =>
            Rule.custom((options, context) => {
               const fieldType = (context.parent as any)?.fieldType
               if ((fieldType === 'select' || fieldType === 'radio') && (!options || options.length === 0)) {
                  return 'Options are required for Select and Radio field types'
               }
               return true
            }),
      }),
   ],
   preview: {
      select: {
         title: 'label',
         subtitle: 'fieldType',
         name: 'name',
      },
      prepare({ title, subtitle, name }) {
         return {
            title: title || 'Unnamed Field',
            subtitle: `${subtitle} (${name})`,
         }
      },
   },
})
