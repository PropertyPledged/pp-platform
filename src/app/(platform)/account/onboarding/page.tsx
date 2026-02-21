// import OnboardingForm from '@/components/onboarding/OnboardingForm'
import { SanityFormConfig } from '@/components/organisms/DynamicForm'
import { getFormBySlug } from '@/sanity/utils/getForm'
import { notFound } from 'next/navigation'
import { OnboardingFormClient } from './OnboardingFormClient'

export default async function OnboardingPage() {
   const form = await getFormBySlug('onboarding')
   if (!form) {
      return notFound()
   }

   return (
      <div className="flex max-w-4xl bg-blue-500">
         <OnboardingFormClient formConfig={form as SanityFormConfig} />
      </div>
   )
}
