"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="space-x-4">
      <Button variant="outline" className="w-36" asChild>
        <Link href="/signup">Join Us</Link>
      </Button>
      <Button className="w-36" asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    </div>
  );
}
