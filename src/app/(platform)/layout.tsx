import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId } = await auth();
  if (!userId) redirect("/signin");
  return <div>{children}</div>;
}

export default PlatformLayout;
