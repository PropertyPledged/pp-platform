'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { PROPERTY_CATEGORIES, getPropertyTypesByCategory } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import StepPersonalDetails from './steps/StepPersonalDetails'
import StepPropertyInfo from './steps/StepPropertyInfo'

const onboardingSchema = z.object({
   // Personal Details
   name: z.string().min(2, 'Name must be at least 2 characters'),
   email: z.string().email('Invalid email address'),
   phone: z.string().min(10, 'Phone number must be at least 10 characters'),
   role: z.enum(['tenant', 'landlord', 'leaseholder']).refine((value) => !!value, {
      message: 'Please select a role',
   }),

   // Property Information (Optional for now, or required based on step)
   location: z.string().optional(),
   address: z.string().optional(),
   propertyCategory: z.enum(['residential', 'commercial']).optional(),
   propertyType: z.string().optional(),
   duration: z.string().optional(),
   leaseAgreement: z.any().optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

const STEPS = [
   { id: 1, name: 'Personal details' },
   { id: 2, name: 'Property information' },
]

export default function OnboardingForm() {
   const { user, isLoaded } = useUser()
   const [currentStep, setCurrentStep] = useState(1)
   const [showErrors, setShowErrors] = useState(false)

   const form = useForm<OnboardingValues>({
      resolver: zodResolver(onboardingSchema),
      defaultValues: {
         name: '',
         email: '',
         phone: '',
         role: undefined,
         location: '',
         address: '',
         propertyCategory: 'residential',
         propertyType: '',
         duration: '',
      },
      mode: 'onChange',
   })

   const step1Fields: (keyof OnboardingValues)[] = ['name', 'email', 'phone', 'role']
   const step2Fields: (keyof OnboardingValues)[] = ['location', 'address', 'propertyType', 'duration']

   const step1IsValid = step1Fields.every((field) => form.getFieldState(field).invalid === false && form.getValues(field))
   const step2IsValid = step2Fields.every((field) => form.getFieldState(field).invalid === false && form.getValues(field))

   const getInvalidFields = () => {
      const fields = currentStep === 1 ? step1Fields : step2Fields
      return fields
         .filter((field) => {
            const value = form.getValues(field)
            const state = form.getFieldState(field)
            return state.invalid || !value
         })
         .map((field) => {
            const fieldLabels: Record<string, string> = {
               name: 'Name',
               email: 'Email',
               phone: 'Phone',
               role: 'Role',
               location: 'Postcode',
               address: 'Address',
               propertyType: 'Property Type',
               duration: 'Duration of stay',
            }
            return fieldLabels[field] || field
         })
   }

   useEffect(() => {
      if (isLoaded && user) {
         if (!form.getValues('name') && user.fullName) {
            form.setValue('name', user.fullName)
         }
         if (!form.getValues('email') && user.primaryEmailAddress?.emailAddress) {
            form.setValue('email', user.primaryEmailAddress.emailAddress)
         }
      }
   }, [isLoaded, user, form])

   const handleNext = async () => {
      const fieldsToValidate = currentStep === 1 ? (['name', 'email', 'phone', 'role'] as const) : (['location', 'address', 'propertyType', 'duration'] as const)

      const isValid = await form.trigger(fieldsToValidate)

      if (isValid) {
         setShowErrors(false)
         setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
      } else {
         setShowErrors(true)
      }
   }

   const handleBack = () => {
      setShowErrors(false)
      setCurrentStep((prev) => Math.max(prev - 1, 1))
   }

   const onSubmit = (data: OnboardingValues) => {
      console.log('Form submitted:', data)
      // TODO: Submit to API
   }

   return (
      <Card className="w-full border-none bg-transparent shadow-none">
         <CardContent className="p-0">
            <div className="mb-8 text-center">
               <h1 className="text-2xl font-semibold text-gray-900">Complete Your Profile</h1>
               <p className="mt-2 text-sm text-gray-500">Just a few more details to get you started</p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8 flex items-center justify-center space-x-4">
               {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                     <div className={cn('flex items-center space-x-2', currentStep >= step.id ? 'text-gray-900' : 'text-gray-400')}>
                        <div className={cn('flex h-5 w-5 items-center justify-center rounded-full text-[10px]', currentStep > step.id ? 'bg-orange-500 text-white' : currentStep === step.id ? 'border-2 border-slate-600 bg-slate-600' : 'border-2 border-gray-200 bg-gray-200')}>
                           {currentStep > step.id && (
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                           )}
                           {currentStep === step.id && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium">{step.name}</span>
                     </div>
                     {index < STEPS.length - 1 && <div className="mx-4 h-[1px] w-12 bg-gray-200" />}
                  </div>
               ))}
            </div>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {showErrors && (
                     <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Please complete the required fields</AlertTitle>
                        <AlertDescription>
                           {getInvalidFields().join(', ')} {getInvalidFields().length === 1 ? 'is' : 'are'} required
                        </AlertDescription>
                     </Alert>
                  )}

                  {currentStep === 1 && <StepPersonalDetails />}
                  {currentStep === 2 && <StepPropertyInfo />}

                  <div className="mt-8">
                     {currentStep === 1 ? (
                        <Button type="button" onClick={handleNext} className="w-full" variant={step1IsValid ? 'default' : 'secondary'} disabled={!step1IsValid}>
                           Continue
                        </Button>
                     ) : (
                        <div className="grid grid-cols-1 gap-4 space-x-4 overflow-hidden md:grid-cols-2">
                           <Button type="button" onClick={handleBack} className="w-full" variant="outline">
                              Back
                           </Button>
                           <Button type="submit" className="w-full" disabled={!step2IsValid}>
                              Complete profile
                           </Button>
                        </div>
                     )}
                  </div>

                  <p className="mt-6 text-center text-xs text-gray-500">
                     <span className="font-medium text-slate-900">We value your privacy.</span> Your information is secure and will not be shared without your permission.
                  </p>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
