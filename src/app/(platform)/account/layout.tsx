import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/Sidebar'
import React from 'react'

<<<<<<< HEAD
export default function AccountLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex min-h-screen flex-col">
         <Navbar />
         <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-screen-2xl">
            <Sidebar />
            <main className="w-full overflow-y-auto p-8">{children}</main>
         </div>
=======
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <div className="flex min-h-[calc(100vh-4rem)] max-w-screen-2xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
>>>>>>> task/onboarding
      </div>
   )
}
