import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <Link 
      href="/" 
      passHref 
      className={cn("flex items-center justify-center cursor-pointer", className)}
    >
      <Image
        src="/pplogo.png"
        alt="logo"
        loading="eager"
        width={100}
        height={100}
        unoptimized={true}
        className="h-auto w-auto object-contain"
      />
    </Link>
  );
}

export default Logo;
