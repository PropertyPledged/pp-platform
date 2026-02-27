'use client'

import { DynamicForm, SanityFormConfig } from '@/components/organisms/DynamicForm'

export function OnboardingFormClient({ formConfig }: { formConfig: SanityFormConfig }) {
   const handleSubmit = (data: any) => {
      console.log('Form data submitted:', data)
      alert('Form submitted successfully! Check console for details.')
   }

   return <DynamicForm config={formConfig} onSubmit={handleSubmit} />
}
