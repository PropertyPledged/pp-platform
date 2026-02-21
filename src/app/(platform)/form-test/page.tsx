'use client'

import { DynamicForm, SanityFormConfig } from '@/components/organisms/DynamicForm'
import React from 'react'

const mockFormConfig: SanityFormConfig = {
   title: 'Complete Your Profile',
   layoutType: 'stepped',
   steps: [
      {
         _key: 'step1',
         stepTitle: 'Personal details',
         fields: [
            { _key: 'f1', name: 'name', label: 'Name', placeholder: 'Jane Doe', fieldType: 'string', required: true },
            { _key: 'f2', name: 'email', label: 'Email', placeholder: 'janedoe@gmail.com', fieldType: 'string', required: true },
            { _key: 'f3', name: 'phone', label: 'Phone number', placeholder: 'UK +1123 345', fieldType: 'string' },
            { _key: 'f4', name: 'role', label: 'Choose your role', fieldType: 'select', options: ['I am a Tenant', 'I am a Leaseholder', 'I am a Landlord or Agent'], required: true },
         ],
      },
      {
         _key: 'step2',
         stepTitle: 'Property information',
         fields: [
            { _key: 'f5', name: 'location', label: 'Search location', fieldType: 'string' },
            { _key: 'f6', name: 'address', label: 'Property address', placeholder: '45 Maple Avenue, London...', fieldType: 'text' },
            { _key: 'f7', name: 'propertyType', label: 'Property type', fieldType: 'select', options: ['Apartment', 'House', 'Studio'] },
            { _key: 'f8', name: 'units', label: 'Number of units', fieldType: 'string' },
            { _key: 'f9', name: 'consent', label: 'I consent to Property Pledge verifying my ownership through the land registry and agree to provide any necessary documentation. Read more', fieldType: 'boolean', required: true },
         ],
      },
   ],
}

export default function FormTestPage() {
   return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
         <div className="mx-auto max-w-3xl space-y-6">
            <div className="text-center">
               <h1 className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Test Harness</h1>
               <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Dynamic Form Builder</p>
               <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">Testing the dynamic generation of complex forms from Sanity CMS configuration, including stepped validation and component rendering.</p>
            </div>

            <DynamicForm
               config={mockFormConfig}
               onSubmit={(data) => {
                  console.log('Form Submitted!', data)
                  alert('Form submitted! Check console for data.')
               }}
            />
         </div>
      </div>
   )
}
