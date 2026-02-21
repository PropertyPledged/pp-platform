import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import type { OnboardingValues } from '../OnboardingForm'

export default function StepPersonalDetails() {
   const { control } = useFormContext<OnboardingValues>()

   return (
      <div className="space-y-4">
         <FormField
            control={control}
            name="name"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Full Name</FormLabel>
                  <FormDescription>Enter your full name</FormDescription>
                  <FormControl>
                     <Input placeholder="Jane Doe" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="email"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Email</FormLabel>
                  <FormControl className="mt-2">
                     <Input placeholder="janedoe@gmail.com" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="phone"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Phone number</FormLabel>
                  <FormControl className="mt-2">
                     <Input placeholder="+447409123456" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name="role"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="text-gray-900">Choose your role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl className="mt-2">
                        <SelectTrigger className="h-12 text-gray-500">
                           <SelectValue placeholder="Role" />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        <SelectItem value="tenant">I am a Tenant</SelectItem>
                        <SelectItem value="leaseholder">I am a Leaseholder</SelectItem>
                        <SelectItem value="landlord">I am a Landlord or Agent</SelectItem>
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />
      </div>
   )
}
