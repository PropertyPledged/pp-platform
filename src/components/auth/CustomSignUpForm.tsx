'use client'

import Logo from '@/components/atoms/Logo'
import AuthIcon from '@/components/auth/AuthIcon'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signupSchema, type SignupType } from '@/schemas/signup'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'

export default function CustomSignUpForm() {
   const { isLoaded, signUp, setActive } = useSignUp()
   const [verifying, setVerifying] = React.useState(false)
   const [code, setCode] = React.useState('')
   const router = useRouter()
   const [isSubmitting, setIsSubmitting] = React.useState(false)

   const form = useForm<SignupType>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   // Handle OAuth sign up
   const signUpWith = (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
      if (!isLoaded) return

      return signUp.authenticateWithRedirect({
         strategy,
         redirectUrl: '/sso-callback',
         redirectUrlComplete: '/account/onboarding',
      })
   }

   const onSubmit = form.handleSubmit(async (data) => {
      if (!isLoaded) return

      try {
         setIsSubmitting(true)
         await signUp.create({
            emailAddress: data.email,
            password: data.password,
         })

         // Send email verification code
         await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

         setVerifying(true)
         setIsSubmitting(false)
      } catch (err: unknown) {
         setIsSubmitting(false)
         console.error(JSON.stringify(err, null, 2))
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const errors = (err as any).errors
         toast.error(errors?.[0]?.message ?? 'Something went wrong')
      }
   })

   // Handle email verification
   const handleVerification = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!isLoaded) return

      try {
         setIsSubmitting(true)
         const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
         })

         if (completeSignUp.status !== 'complete') {
            /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
            console.log(JSON.stringify(completeSignUp, null, 2))
            setIsSubmitting(false)
         }

         if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId })
            router.push('/account/onboarding')
            setIsSubmitting(false)
         }
      } catch (err: unknown) {
         setIsSubmitting(false)
         console.error(JSON.stringify(err, null, 2))
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const errors = (err as any).errors
         toast.error(errors?.[0]?.message ?? 'Verification failed')
      }
   }

   if (verifying) {
      return (
         <div className="flex w-full flex-col items-center justify-center gap-6 p-8">
            <div className="mb-8">
               <Logo />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
            <p className="text-muted-foreground text-center text-sm">
               We sent a code to <span className="font-medium">{form.getValues('email')}</span>
            </p>
            <form onSubmit={handleVerification} className="w-full max-w-sm space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" required />
               </div>
               <Button type="submit" className="w-full bg-[#001F3F] text-white hover:bg-[#001F3F]/90" disabled={isSubmitting}>
                  {isSubmitting ? 'Verifying...' : 'Verify Email'}
               </Button>
            </form>
         </div>
      )
   }

   return (
      <div className="flex w-full flex-col items-center justify-center p-8">
         <div className="size-20">
            <Logo />
         </div>

         <div className="mt-20 flex w-full max-w-[400px] flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
               <h1 className="text-2xl font-semibold tracking-tight">Create Your Account</h1>
               <p className="text-muted-foreground text-sm">Sign up quickly with your preferred social media account</p>
            </div>

            <div className="flex gap-4">
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signUpWith('oauth_google')}>
                  <AuthIcon provider="google" />
                  Google
               </Button>
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signUpWith('oauth_facebook')}>
                  <AuthIcon provider="facebook" />
                  Facebook
               </Button>
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signUpWith('oauth_apple')}>
                  <AuthIcon provider="apple" />
                  Apple ID
               </Button>
            </div>

            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">Or</span>
               </div>
            </div>

            <Form {...form}>
               <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Sign up with your email</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="janedoe@gmail.com" className="h-12" type="email" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Create a password" type="password" className="h-12" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Button type="submit" className="h-12 w-full bg-[#001F3F] text-white hover:bg-[#001F3F]/90" disabled={isSubmitting}>
                     {isSubmitting ? 'Creating account...' : 'Create my account'}
                  </Button>
               </form>
            </Form>

            <div className="text-center text-sm">
               Already have an account?{' '}
               <Link href="/signin" className="font-semibold text-[#001F3F] hover:underline">
                  Login here
               </Link>
            </div>

            <div className="text-muted-foreground mt-auto text-center text-xs">
               <p>
                  <span className="font-semibold text-[#001F3F]">We value your privacy.</span> Your information is secure and will not be shared without your permission.
               </p>
            </div>

            <div className="text-muted-foreground mt-8 text-center text-xs">Property Pledge © {new Date().getFullYear()}. All rights reserved.</div>
         </div>
      </div>
   )
}
