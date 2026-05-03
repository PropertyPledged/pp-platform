import { redirect } from "next/navigation";
import React from "react";

async function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export default PlatformLayout;
