'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
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
            // String-based types: string, text, select, radio
            let strSchema = z.string()
            if (field.required) {
               strSchema = strSchema.min(1, { message: 'This field is required' })
            } else {
               fieldSchema = strSchema.optional()
            }
            if (field.required) {
               fieldSchema = strSchema
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
      <div className="flex w-full flex-col items-center justify-center p-8">
         <div className="flex w-full max-w-xl flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
               {config.title && <h2 className="text-2xl font-semibold tracking-tight">{config.title}</h2>}
               {isStepped && (
                  <p className="text-muted-foreground text-sm">
                     Step {currentStepIndex + 1} of {formSteps.length}
                  </p>
               )}
            </div>

            {/* Step Indicator (Multi-step only) */}
            {isStepped && formSteps.length > 1 && (
               <div className="mb-8 flex items-center justify-center space-x-4">
                  {formSteps.map((step, index) => (
                     <React.Fragment key={step._key || index}>
                        <div className="flex items-center space-x-2">
                           <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${index <= currentStepIndex ? 'bg-[#001F3F] text-white' : 'bg-slate-100 text-slate-400'}`}>{index + 1}</div>
                           <span className={`hidden text-sm font-medium sm:inline-block ${index <= currentStepIndex ? 'text-[#001F3F]' : 'text-slate-400'}`}>{step.stepTitle}</span>
                        </div>
                        {index < formSteps.length - 1 && <div className={`h-px w-12 ${index < currentStepIndex ? 'bg-[#001F3F]' : 'bg-slate-200'}`} />}
                     </React.Fragment>
                  ))}
               </div>
            )}

            {/* Form Area */}
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  {/* Render Standard mode: all steps at once. Render Stepped mode: current step only */}
                  {isStepped ? (
                     <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-300">{currentStep?.fields?.map((field: any) => <FormInputRenderer key={field._key || field.name} fieldConfig={field} />)}</div>
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
                  <div className="flex justify-between gap-4 pt-6">
                     {isStepped && !isFirstStep ? (
                        <Button type="button" variant="outline" className="h-12 flex-1" onClick={handleBack}>
                           Previous Step
                        </Button>
                     ) : (
                        <div></div> // Spacer to keep Next/Submit aligned right if no Back button
                     )}

                     {isStepped && !isLastStep ? (
                        <Button type="button" className="h-12 flex-1 bg-[#001F3F] text-white hover:bg-[#001F3F]/90" onClick={handleNext}>
                           Continue
                        </Button>
                     ) : (
                        <Button type="submit" className="h-12 flex-1 bg-[#001F3F] text-white hover:bg-[#001F3F]/90">
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
