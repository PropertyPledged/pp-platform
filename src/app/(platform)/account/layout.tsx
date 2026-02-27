import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/Sidebar'
import React from 'react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex min-h-screen flex-col">
         <Navbar />
         <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-screen-2xl">
            <Sidebar />
            <main className="w-full overflow-y-auto p-8">{children}</main>
         </div>
      </div>
   )
}
