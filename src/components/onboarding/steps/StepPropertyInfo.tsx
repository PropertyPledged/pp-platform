'use client'

import AddressAutocomplete from '@/components/molecules/AddressAutocomplete'
import FileDropzone from '@/components/molecules/FileDropzone'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PROPERTY_CATEGORIES, getPropertyTypesByCategory } from '@/lib/constants'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import type { OnboardingValues } from '../OnboardingForm'

export default function StepPropertyInfo() {
   const { control, watch } = useFormContext<OnboardingValues>()

   const propertyCategory = watch('propertyCategory')
   const propertyTypes = useMemo(() => {
      if (propertyCategory) {
         return getPropertyTypesByCategory(propertyCategory)
      }
      return []
   }, [propertyCategory])

   return (
      <div className="space-y-4">
         <AddressAutocomplete control={control} addressFieldName="address" postcodeFieldName="location" label="Property address" placeholder="Search address" />

         <FormField
            control={control}
            name="propertyCategory"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Property Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                        <SelectTrigger className="h-12 text-gray-500">
                           <SelectValue placeholder="Property category" />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {PROPERTY_CATEGORIES.map((category) => (
                           <SelectItem key={category.value} value={category.value}>
                              {category.label}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="propertyType"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Property type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                        <SelectTrigger className="h-12 text-gray-500">
                           <SelectValue placeholder="Property type" />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {propertyTypes.map((type) => (
                           <SelectItem key={type.value} value={type.value}>
                              {type.label}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="duration"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Duration of stay</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                        <SelectTrigger className="h-12 text-gray-500">
                           <SelectValue placeholder="Enter duration" />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        <SelectItem value="0-6">0-6 months</SelectItem>
                        <SelectItem value="6-12">6-12 months</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2+">2+ years</SelectItem>
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="leaseAgreement"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Upload lease agreement (optional)</FormLabel>
                  <FormControl>
                     <FileDropzone accept={{ 'application/pdf': ['.pdf', '.doc', '.docx'] }} maxFiles={1} onFilesSelected={(files) => field.onChange(files[0])} onFilesRemoved={() => field.onChange(null)} />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
      </div>
   )
}
