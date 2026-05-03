'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
<<<<<<< HEAD
import { UserButton, useUser, useAuth } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'
=======
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { Sparkles, LayoutDashboard } from 'lucide-react'
>>>>>>> task/onboarding
import { useRouter } from 'next/navigation'

export default function UserNavigation() {
   const router = useRouter()
   const { user } = useUser()
<<<<<<< HEAD
   const { isSignedIn } = useAuth()
   const { data: me } = api.users.me.useQuery(user?.id ?? '', {
      enabled: !!user?.id,
   })

   // if (user?.id && !me?.isOnboarded) {
   //    redirect('/onboarding')
   // }

   if (!isSignedIn) return null

   return (
      <div className="flex items-center justify-center gap-3">
         <Button className="w-36">Write a review</Button>
         <UserButton userProfileUrl="/account">
            <UserButton.MenuItems>{!me?.isOnboarded && <UserButton.Action label="Complete Profile" labelIcon={<Sparkles className="h-4 w-4" />} onClick={() => router.push('/onboarding')} />}</UserButton.MenuItems>
         </UserButton>
      </div>
=======
   const { data: me } = api.users.getByClerkId.useQuery({clerkId: user?.id ?? ""}, 
      {enabled: !!user?.id}
   )

   return (
      <SignedIn>
         <div className="flex items-center justify-center gap-3">
            <Button className="w-36">Write a review</Button>
            <UserButton userProfileUrl="/account">
               <UserButton.MenuItems>{!me?.isOnboarded && <UserButton.Action label="Complete Profile" labelIcon={<Sparkles className="h-4 w-4" />} onClick={() => router.push('/onboarding')} />}</UserButton.MenuItems>
               <UserButton.MenuItems>{me?.isOnboarded && <UserButton.Action label="Dashboard" labelIcon={<LayoutDashboard className="h-4 w-4" />} onClick={() => router.push('/dashboard')} />}</UserButton.MenuItems>
            </UserButton>
         </div>
      </SignedIn>
>>>>>>> task/onboarding
   )
}
