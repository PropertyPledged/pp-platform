'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Heading from '../atoms/Heading'
import { FormInputRenderer, SanityFormField } from './FormInputRenderer'

// --- Types ---

export interface SanityFormStep {
   _key: string
   stepTitle: string
   fields: SanityFormField[]
}

export interface SanityFormConfig {
   title: string
   layoutType: 'standard' | 'stepped'
   steps: SanityFormStep[]
}

interface DynamicFormProps {
   config: SanityFormConfig
   onSubmit: (data: any) => void
}

// --- Helper: Build Zod Schema Dynamically ---

function buildZodSchema(steps: SanityFormStep[]) {
   const schemaShape: Record<string, z.ZodTypeAny> = {}

   steps.forEach((step) => {
      step.fields.forEach((field) => {
         let fieldSchema: z.ZodTypeAny = z.any()

         if (field.fieldType === 'boolean') {
            let boolSchema = z.boolean().default(false)
            if (field.required) {
               // A required boolean (like "I agree to terms") must be true
               fieldSchema = z.boolean().refine((val) => val === true, {
                  message: 'You must check this box to continue',
               })
            } else {
               fieldSchema = boolSchema
            }
         } else {
            // String-based types: string, text, select, radio, address, email, phone
            let strSchema = z.string()

            if (field.fieldType === 'email') {
               strSchema = strSchema.email({ message: 'Please enter a valid email address' })
            }

            if (field.required) {
               strSchema = strSchema.min(1, { message: 'This field is required' })
               fieldSchema = strSchema
            } else {
               // If it's an optional email, z.string().email() still requires a valid email.
               // Zod requires empty strings to either be omitted or ignored unless we use z.union([z.string().email(), z.literal('')]) or .optional().
               // To allow empty strings for non-required fields:
               fieldSchema = strSchema.optional().or(z.literal(''))
            }
         }

         schemaShape[field.name] = fieldSchema
      })
   })

   return z.object(schemaShape)
}

// --- Component ---

export function DynamicForm({ config, onSubmit }: DynamicFormProps) {
   const [currentStepIndex, setCurrentStepIndex] = useState(0)

   const isStepped = config.layoutType === 'stepped'
   const formSteps = config.steps || []

   // If no steps are provided, fallback to an empty component
   if (formSteps.length === 0) {
      return <div>No form steps configured.</div>
   }

   const currentStep = isStepped ? formSteps[currentStepIndex] : formSteps[0]
   const isFirstStep = currentStepIndex === 0
   const isLastStep = currentStepIndex === formSteps.length - 1

   // Generate the Zod schema
   const formSchema = useMemo(() => buildZodSchema(formSteps), [formSteps])

   // Initialize React Hook Form
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
      mode: 'onBlur', // Validate fields on blur for better UX
   })

   // --- Handlers ---

   const handleNext = async () => {
      // Only validate fields on the current step
      const fieldsToValidate = currentStep?.fields?.map((f) => f.name) || []
      const isValid = await form.trigger(fieldsToValidate)

      if (isValid && !isLastStep) {
         setCurrentStepIndex((prev) => prev + 1)
         window.scrollTo(0, 0)
      }
   }

   const handleBack = () => {
      if (!isFirstStep) {
         setCurrentStepIndex((prev) => prev - 1)
         window.scrollTo(0, 0)
      }
   }

   const handleFormSubmit = (data: any) => {
      // In stepped mode, only submit if we are on the last step
      if (isStepped && !isLastStep) {
         // It shouldn't get here because of the button type, but just in case
         handleNext()
         return
      }

      onSubmit(data)
   }

   return (
      <div className="flex w-full flex-col items-start justify-start p-8">
         <div className="flex w-full max-w-xl flex-col gap-6">
            {config.title && <Heading className="text-2xl font-semibold tracking-tight">{config.title}</Heading>}

            {isStepped && formSteps.length > 1 && (
               <div className="mb-8 flex items-center justify-start space-x-4">
                  {formSteps.map((step, index) => (
                     <div key={step._key || index} className="flex items-center">
                        <div className={`flex items-center space-x-2 ${currentStepIndex >= index ? 'text-gray-900' : 'text-gray-400'}`}>
                           <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${currentStepIndex > index ? 'bg-orange-500 text-white' : currentStepIndex === index ? 'border-2 border-slate-600 bg-slate-600' : 'border-2 border-gray-200 bg-gray-200'}`}>
                              {currentStepIndex > index && (
                                 <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                 </svg>
                              )}
                              {currentStepIndex === index && <div className="h-2 w-2 rounded-full bg-white" />}
                           </div>
                           <span className="text-sm font-medium">{step.stepTitle}</span>
                        </div>
                        {index < formSteps.length - 1 && <div className="mx-4 h-px w-12 bg-gray-200" />}
                     </div>
                  ))}
               </div>
            )}

            {/* Form Area */}
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  {/* Render Standard mode: all steps at once. Render Stepped mode: current step only */}
                  {isStepped ? (
                     <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">
                        {currentStep?.fields?.map((field: any) => (
                           <FormInputRenderer key={field._key || field.name} fieldConfig={field} />
                        ))}
                     </div>
                  ) : (
                     <div className="space-y-8">
                        {formSteps.map((step) => (
                           <div key={step._key} className="space-y-6">
                              {step.stepTitle && <h3 className="border-b pb-2 text-lg font-semibold">{step.stepTitle}</h3>}
                              {step.fields.map((field) => (
                                 <FormInputRenderer key={field._key || field.name} fieldConfig={field} />
                              ))}
                           </div>
                        ))}
                     </div>
                  )}

                  {/* Navigation / Submit Buttons */}
                  <div className="flex justify-start gap-4 pt-6">
                     {isStepped && !isFirstStep && (
                        <Button type="button" variant="outline" className="h-12 flex-1" onClick={handleBack}>
                           Previous Step
                        </Button>
                     )}

                     {isStepped && !isLastStep ? (
                        <Button type="button" className="h-12 bg-[#001F3F] text-white hover:bg-[#001F3F]/90" onClick={handleNext}>
                           Continue
                        </Button>
                     ) : (
                        <Button type="submit" className="h-12 bg-[#001F3F] text-white hover:bg-[#001F3F]/90">
                           {isStepped ? 'Complete Form' : 'Submit'}
                        </Button>
                     )}
                  </div>
               </form>
            </Form>
         </div>
      </div>
   )
}
