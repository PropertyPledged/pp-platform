'use client'

import { cn } from '@/lib/utils'
import { Settings, User, Bell, Globe, Users, CreditCard, Wrench, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
   {
      section: 'GENERAL SETTINGS',
      items: [
         { name: 'Onboarding', href: '/account/onboarding', icon: Sparkles },
         { name: 'Account', href: '/account', icon: User },
         //  { name: 'Notification', href: '/account/notifications', icon: Bell },
         //  { name: 'Language & Region', href: '/account/language', icon: Globe },
      ],
   },
   //  {
   //     section: 'WORKSPACE SETTINGS',
   //     items: [
   //        { name: 'General', href: '/account/workspace/general', icon: Settings },
   //        { name: 'Members', href: '/account/workspace/members', icon: Users },
   //        { name: 'Billing', href: '/account/workspace/billing', icon: CreditCard },
   //     ],
   //  },
]

export default function Sidebar() {
   const pathname = usePathname()

   return (
      <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 border-r bg-gray-50 lg:block">
         <div className="flex flex-col gap-8 px-4 py-8">
            {sidebarItems.map((section) => (
               <div key={section.section} className="flex flex-col gap-2">
                  <h3 className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">{section.section}</h3>
                  <nav className="flex flex-col gap-1">
                     {section.items.map((item) => {
                        const isActive = pathname === item.href
                        return (
                           <Link key={item.name} href={item.href} className={cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors', isActive ? 'text-foreground bg-gray-100' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50')}>
                              <item.icon className="h-4 w-4" />
                              {item.name}
                           </Link>
                        )
                     })}
                  </nav>
               </div>
            ))}
         </div>
      </div>
   )
}
