"use client";

import { useDisclosure } from "@/hooks/useDisclosure";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Logo from "@/components/atoms/Logo";
import Navlinks from "@/components/molecules/Navlinks";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthButtons } from "./AuthButtons";

export function MobileNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = () => {
    if (typeof window !== "undefined") {
      const subscribe = document.getElementById("subscribe");
      if (subscribe) {
        subscribe.scrollTo({ behavior: "smooth", top: 20 });
        subscribe.querySelector("input")?.focus();
      }
    }
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          onClose();
        },
      },
    });
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
          </div>
          {session && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push("/account");
                  onClose();
                }}
              >
                Account Settings
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          )}
          {!session && <AuthButtons />}
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
