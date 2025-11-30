"use client";

import { useDisclosure } from "@/hooks/useDisclosure";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "@components/atoms/Logo";
import Navlinks from "@components/molecules/Navlinks";
import { Button } from "@components/ui/button";
import Animate from "../atoms/Animate";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function Navbar() {
  const pathname = usePathname();
  const hidden = ["/suggestion"];

  if (hidden.includes(pathname)) return null;

  // const handleSubscribe = () => {
  //   // get the input id and focus on it
  //   if (typeof window !== "undefined") {
  //     const subscribe = document.getElementById("subscribe");
  //     if (subscribe) {
  //       subscribe.scrollTo({ behavior: "smooth", top: 20 });
  //       // get the input and focus on it
  //       subscribe.querySelector("input")?.focus();
  //     }
  //   }
  // };
  return (
    <Animate
      dir="down"
      useObserver={false}
      initiallyVisible={true}
      className="sticky top-0 left-0 z-20 h-14 w-full border-b border-gray-200 bg-gray-50 px-6 md:h-16 2xl:px-0"
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between gap-x-4">
        <Logo />
        <div className="hidden flex-1 items-center justify-end gap-x-8 lg:flex">
          <Navlinks />
          <div className="space-x-4">
            {/* <Button className="w-36" onClick={handleSubscribe}>
              Subscribe
            </Button> */}
            <SignedOut>
              <Button variant="outline" className="w-36" asChild>
                <Link className="" href="/signup">
                  Join Us
                </Link>
              </Button>
              <Button className="w-36" asChild>
                <Link className="" href="/signin">
                  Sign In
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-center gap-3">
                <Button className="w-36">Write a review</Button>
                <UserButton userProfileUrl="/account" />
              </div>
            </SignedIn>
          </div>
        </div>
        <MobileNav />
      </div>
    </Animate>
  );
}

function MobileNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pathname = usePathname();
  const handleSubscribe = () => {
    // get the input id and focus on it
    if (typeof window !== "undefined") {
      const subscribe = document.getElementById("subscribe");
      if (subscribe) {
        subscribe.scrollTo({ behavior: "smooth", top: 20 });
        // get the input and focus on it
        subscribe.querySelector("input")?.focus();
      }
    }
  };

  return (
    <Sheet
      open={isOpen}
      key={pathname}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetTrigger className="p-0 lg:hidden">
        <Hamburger
          toggled={isOpen}
          onToggle={onOpen}
          direction="right"
          size={25}
        />
      </SheetTrigger>
      <SheetContent className="h-screen w-screen space-y-9" side="left">
        <SheetHeader className="h-16 max-w-screen">
          <Logo />
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="space-y-10 py-8">
          <Navlinks cb={onClose} />
          <div className="flex space-x-4">
            <Button className="w-48" onClick={handleSubscribe}>
              Subscribe
            </Button>
            {/* <Button variant="outline" className="w-36">Join Us</Button> */}
            {/* <Button className="w-36">Write a review</Button> */}
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-0 flex w-full justify-start">
          <Image
            src="/wavy.png"
            width={600}
            height={600}
            alt="wavy graphic"
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Navbar;
