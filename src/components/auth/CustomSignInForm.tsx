'use client'

import Logo from '@/components/atoms/Logo'
import AuthIcon from '@/components/auth/AuthIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signinSchema, type SigninType } from '@/schemas/signin'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'sanity'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

export default function CustomSignInForm() {
   const router = useRouter()
   const { isLoaded, signIn, setActive } = useSignIn()
   const [isSubmitting, setIsSubmitting] = React.useState(false)

   const form = useForm<SigninType>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   // Handle OAuth sign in
   const signInWith = (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
      if (!isLoaded) return
      return signIn.authenticateWithRedirect({
         strategy,
         redirectUrl: '/sso-callback',
         redirectUrlComplete: '/',
      })
   }

   const onSubmit = form.handleSubmit(async (data) => {
      if (!isLoaded) return
      try {
         setIsSubmitting(true)
         const result = await signIn.create({
            identifier: data.email,
            password: data.password,
         })

         if (result.status === 'complete') {
            await setActive({ session: result.createdSessionId })
            router.push('/')
            setIsSubmitting(false)
         } else {
            toast.error('Sign in failed. Please try again.')
         }
      } catch (err: unknown) {
         setIsSubmitting(false)
         console.error(JSON.stringify(err, null, 2))
         const errors = (err as { errors?: { message: string }[] }).errors
         toast.error(errors?.[0]?.message ?? 'Invalid email or password')
      }
   })

   return (
      <div className="flex w-full flex-col items-center justify-center p-8">
         <div className="size-20">
            <Logo />
         </div>

         <div className="mt-20 flex w-full max-w-[400px] flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
               <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
               <p className="text-muted-foreground text-sm">Sign into your account with your preferred social media account</p>
            </div>

            <div className="flex gap-4">
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signInWith('oauth_google')}>
                  <AuthIcon provider="google" />
                  Google
               </Button>
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signInWith('oauth_facebook')}>
                  <AuthIcon provider="facebook" />
                  Facebook
               </Button>
               <Button variant="outline" className="h-12 flex-1 gap-2" onClick={() => signInWith('oauth_apple')}>
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
                              <FormLabel>Sign in with your email</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Jane Doe" className="h-12" type="email" />
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
                                 <Input {...field} placeholder="********" type="password" className="h-12" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Button type="submit" className="h-12 w-full bg-[#001F3F] text-white hover:bg-[#001F3F]/90" disabled={isSubmitting}>
                     {isSubmitting ? 'Signing in...' : 'Sign into my account'}
                  </Button>
               </form>
            </Form>

            <div className="text-center text-sm">
               Don&apos;t have an account?{' '}
               <Link href="/signup" className="font-semibold text-[#001F3F] hover:underline">
                  Sign up here
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
