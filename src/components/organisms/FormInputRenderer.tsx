import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import AddressAutocomplete from '../molecules/AddressAutocomplete'

// Sanity field schema type
export interface SanityFormField {
   _key: string
   name: string
   label: string
   fieldType: 'string' | 'email' | 'phone' | 'text' | 'boolean' | 'select' | 'radio' | 'address'
   required?: boolean
   placeholder?: string
   options?: any[] // Can be either string[] or { label: string; value: string }[]
}

interface FormInputRendererProps {
   fieldConfig: SanityFormField
}

export function FormInputRenderer({ fieldConfig }: FormInputRendererProps) {
   const { control } = useFormContext()
   const { name, label, fieldType, placeholder, options } = fieldConfig

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => {
            // Boolean / Checkbox handling
            if (fieldType === 'boolean') {
               return (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                     <FormControl>
                        <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>{label}</FormLabel>
                        <FormMessage />
                     </div>
                  </FormItem>
               )
            }

            // Standard wrapping for other types
            return (
               <FormItem>
                  <FormLabel>{label}</FormLabel>

                  {/* Text Input */}
                  {(fieldType === 'string' || fieldType === 'email' || fieldType === 'phone') && (
                     <FormControl>
                        <Input type={fieldType === 'email' ? 'email' : fieldType === 'phone' ? 'tel' : 'text'} placeholder={placeholder || ''} {...field} value={field.value || ''} className="h-12" />
                     </FormControl>
                  )}

                  {/* Textarea */}
                  {fieldType === 'text' && (
                     <FormControl>
                        <Textarea placeholder={placeholder || ''} {...field} value={field.value || ''} />
                     </FormControl>
                  )}

                  {/* Select Dropdown */}
                  {fieldType === 'select' && (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="h-12">
                              <SelectValue placeholder={placeholder || `Select ${label}`} />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {options?.map((opt, i) => {
                              const val = typeof opt === 'string' ? opt : opt.value
                              const lbl = typeof opt === 'string' ? opt : opt.label
                              return (
                                 <SelectItem key={i} value={val}>
                                    {lbl}
                                 </SelectItem>
                              )
                           })}
                        </SelectContent>
                     </Select>
                  )}

                  {/* Radio Group */}
                  {fieldType === 'radio' && (
                     <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2 flex flex-col space-y-1">
                           {options?.map((opt, i) => {
                              const val = typeof opt === 'string' ? opt : opt.value
                              const lbl = typeof opt === 'string' ? opt : opt.label
                              return (
                                 <FormItem key={i} className="flex items-center space-y-0 space-x-3">
                                    <FormControl>
                                       <RadioGroupItem value={val} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{lbl}</FormLabel>
                                 </FormItem>
                              )
                           })}
                        </RadioGroup>
                     </FormControl>
                  )}

                  {/* Address Autocomplete */}
                  {fieldType === 'address' && <AddressAutocomplete control={control} addressFieldName={name} postcodeFieldName={`${name}_postcode`} label={label} placeholder={placeholder || undefined} />}

                  <FormMessage />
               </FormItem>
            )
         }}
      />
   )
}
