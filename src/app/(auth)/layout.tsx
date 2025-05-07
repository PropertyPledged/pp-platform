import Image from "next/image";
import React from "react";

type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid h-screen grid-cols-2">
      <div>{children}</div>
      <div className="bg-primary col-span-1 flex h-full items-center justify-center overflow-hidden">
        <Image
          width={500}
          height={500}
          src="/wavy2.png"
          alt="wavy auth"
          className="h-full w-full scale-105"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
