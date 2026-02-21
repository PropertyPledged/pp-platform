import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/Sidebar'
import React from 'react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex min-h-screen flex-col">
         <Navbar />
         <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-screen-2xl">
            <Sidebar />
            <main className="flex flex-1 items-start justify-center overflow-y-auto p-8 px-20">{children}</main>
         </div>
      </div>
   )
}
