"use client";

import { usePathname } from "next/navigation";
import Logo from "@components/atoms/Logo";
import Navlinks from "@components/molecules/Navlinks";
import Animate from "@/components/atoms/Animate";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { MobileNav } from "./MobileNav";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const hidden = ["/suggestion"];

  if (hidden.includes(pathname)) return null;

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
            {!session && <AuthButtons />}
            {session && <UserMenu />}
          </div>
        </div>
        <MobileNav />
      </div>
    </Animate>
  );
}

export default Navbar;
