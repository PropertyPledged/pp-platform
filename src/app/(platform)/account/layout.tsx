import React from "react";
import Sidebar from "@/components/organisms/Sidebar";
import Navbar from "@/components/organisms/Navbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] max-w-screen-2xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
