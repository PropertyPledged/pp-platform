import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" passHref className="my-auto h-full w-16 cursor-pointer py-3">
      <Image
        src="/pplogo.png"
        alt="logo"
        width={100}
        height={100}
        unoptimized={true}
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}

export default Logo;
