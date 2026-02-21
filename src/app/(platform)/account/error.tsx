'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
   }, [error])

   return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
         </div>
         <div className="space-y-2">
            <h2 className="text-xl font-semibold text-neutral-900">Something went wrong!</h2>
            <p className="max-w-md text-sm text-neutral-500">We encountered an unexpected error while trying to load this page. {error?.message && <span className="mt-1 block font-mono text-xs text-neutral-400">{error.message}</span>}</p>
         </div>
         <Button onClick={() => reset()} variant="outline" className="mt-4">
            Try again
         </Button>
      </div>
   )
}
