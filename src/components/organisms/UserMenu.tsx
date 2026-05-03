"use client";

import { useRouter } from "next/navigation";
import { Sparkles, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { useCallback } from "react";

export function UserMenu() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = useCallback(async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  }, [router]);

  if (!session) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button className="w-36">Write a review</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex flex-col space-y-2 p-2">
            <div className="text-sm font-medium text-gray-900">
              {session.user.name}
            </div>
            <div className="text-xs text-gray-500">{session.user.email}</div>
          </div>
          <DropdownMenuSeparator />
          {!session.user.onboarded && (
            <DropdownMenuItem onClick={() => router.push("/onboarding")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Complete Profile
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => router.push("/account")}>
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
