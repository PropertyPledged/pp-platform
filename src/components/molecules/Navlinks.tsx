"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ListWrapper from "@components/atoms/ListWrapper";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

type NavlinksProps = {
  cb?: VoidFunction;
};

function Navlinks({ cb }: NavlinksProps) {
  const pathname = usePathname();

  return (
    <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-6">
      <ListWrapper list={links} keyExtractor={(item) => item.label}>
        {(link) => {
          let isActive = false;
          if (link.href === "/") {
            isActive = pathname === link.href;
          } else {
            // remove the initial slash from the pathname
            const pathnameWithoutSlash = pathname.slice(1);
            isActive = pathnameWithoutSlash?.includes(link.href.slice(1));
          }
          return (
            <Link
              passHref
              href={link.href}
              onClick={() => cb && cb()}
              className={cn("text-base lg:text-sm", {
                "underline underline-offset-[8px]": isActive,
              })}
            >
              {link.label}
            </Link>
          );
        }}
      </ListWrapper>
    </div>
  );
}

export default Navlinks;
