'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useUser, useClerk, useSessionList } from '@clerk/nextjs'
import { Github, Monitor, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { ConfirmationDialog } from '../molecules/ConfirmationDialog'
import { AccountSettingsSkeleton } from './AccountSettingsSkeleton'

interface SessionWithActivity {
   id: string
   status: string
   lastActiveAt: Date
   latestActivity?: {
      isMobile: boolean
      deviceType?: string
      browserName?: string
      browserVersion?: string
      city?: string
      country?: string
   }
}

export default function CustomAccountSettings() {
   const { user, isLoaded } = useUser()
   const { signOut } = useClerk()
   const { sessions, isLoaded: isSessionsLoaded } = useSessionList()

   if (!isLoaded || !user || !isSessionsLoaded) {
      return <AccountSettingsSkeleton />
   }

   const handleDeleteAccount = async () => {
      try {
         await user.delete()
         await signOut()
         toast.success('Account deleted successfully')
      } catch (error: unknown) {
         const message = error instanceof Error ? error.message : 'Failed to delete account'
         toast.error(message)
      }
   }

   return (
      <div className="flex max-w-3xl flex-col gap-8">
         <div>
            <h1 className="text-2xl font-semibold">Account</h1>
            <p className="text-muted-foreground">Manage your account information</p>
         </div>

         {/* Profile Section */}
         <div className="space-y-4">
            <h2 className="text-sm font-medium">Profile</h2>
            <div className="flex items-center gap-4">
               <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src={user.imageUrl} alt={user.fullName ?? 'User avatar'} fill className="object-cover" />
               </div>
               <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-muted-foreground text-sm">{user.username}</p>
               </div>
            </div>
         </div>

         <Separator />

         {/* Email Addresses Section */}
         <div className="space-y-4">
            <h2 className="text-sm font-medium">Email Addresses</h2>
            <div className="space-y-4">
               {user.emailAddresses.map((email) => (
                  <div key={email.id} className="flex items-center gap-2">
                     <span className="text-sm">{email.emailAddress}</span>
                     {user.primaryEmailAddressId === email.id && (
                        <Badge variant="secondary" className="bg-red-100 text-xs font-normal text-red-600 hover:bg-red-100">
                           Primary
                        </Badge>
                     )}
                     {email.verification.strategy === 'from_oauth_github' && (
                        <Badge variant="secondary" className="text-xs font-normal">
                           GitHub
                        </Badge>
                     )}
                  </div>
               ))}
            </div>
            <Button variant="ghost" className="h-auto justify-start p-0 font-normal text-red-500 hover:bg-red-50 hover:text-red-600">
               + Add Email Address
            </Button>
         </div>

         <Separator />

         {/* Accounts Section */}
         <div className="space-y-4">
            <h2 className="text-sm font-medium">Accounts</h2>
            <div className="space-y-2">
               {user.externalAccounts.map((account) => (
                  <div key={account.id} className="text-muted-foreground flex items-center gap-2 text-sm">
                     {(account.provider as string) === 'oauth_github' && <Github className="h-4 w-4" />}
                     {/* Add other icons as needed */}
                     <span>{account.username ?? account.emailAddress}</span>
                  </div>
               ))}
               {user.externalAccounts.length === 0 && <p className="text-muted-foreground text-sm">No connected accounts.</p>}
            </div>
         </div>

         <Separator />

         {/* Security Section */}
         <div className="space-y-4">
            <div>
               <h2 className="text-xl font-semibold">Security</h2>
               <p className="text-muted-foreground text-sm">Manage your security preferences</p>
            </div>

            <div className="space-y-4 pt-2">
               <h3 className="text-sm font-medium">Active Devices</h3>
               <div className="space-y-6">
                  {sessions?.map((session) => {
                     const sessionWithActivity = session as unknown as SessionWithActivity
                     return (
                        <div key={session.id} className="flex items-start gap-4">
                           <div className="mt-1">{sessionWithActivity.latestActivity?.isMobile ? <Smartphone className="text-muted-foreground h-6 w-6" /> : <Monitor className="text-muted-foreground h-6 w-6" />}</div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <p className="text-sm font-medium">{sessionWithActivity.latestActivity?.deviceType ?? 'Device'}</p>
                                 {session.status === 'active' && (
                                    <Badge variant="secondary" className="h-5 rounded-sm bg-red-100 px-1.5 py-0 text-xs font-normal text-red-600 hover:bg-red-100">
                                       Current Device
                                    </Badge>
                                 )}
                              </div>
                              {(sessionWithActivity.latestActivity?.browserName ?? sessionWithActivity.latestActivity?.browserVersion) && (
                                 <p className="text-muted-foreground text-xs">
                                    {sessionWithActivity.latestActivity?.browserName} {sessionWithActivity.latestActivity?.browserVersion}
                                 </p>
                              )}
                              {(sessionWithActivity.latestActivity?.city ?? sessionWithActivity.latestActivity?.country) && (
                                 <p className="text-muted-foreground text-xs">
                                    {sessionWithActivity.latestActivity?.city}, {sessionWithActivity.latestActivity?.country}
                                 </p>
                              )}
                              <p className="text-muted-foreground text-xs">{session.lastActiveAt.toLocaleString()}</p>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>

         <Separator />

         {/* Danger Zone */}
         <div className="space-y-4">
            <h2 className="text-sm font-medium">Danger Zone</h2>
            <div className="flex items-center justify-between rounded-lg border border-red-100 p-4">
               <div>
                  <p className="font-medium">Delete your account</p>
                  <p className="text-muted-foreground text-sm">Delete your account and all its associated data.</p>
               </div>
               <ConfirmationDialog
                  trigger={
                     <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                        Delete Account
                     </Button>
                  }
                  title="Delete Account"
                  description="Are you sure you want to delete your account? This action cannot be undone and you will lose all your data."
                  confirmText="Delete Account"
                  onConfirm={() => void handleDeleteAccount()}
                  variant="destructive"
               />
            </div>
         </div>
      </div>
   )
}
