"use client";

import { useSession, deleteUser, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import { Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomAccountSettings() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
      toast.success("Account deleted successfully");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete account";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Profile</h2>
        <div className="flex items-center gap-4">
          {session.user.image && (
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User avatar"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-medium">{session.user.name}</p>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Email Addresses Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Email Addresses</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">{session.user.email}</span>
            <Badge variant="secondary" className="text-xs font-normal bg-green-100 text-green-600 hover:bg-green-100">
              Primary
            </Badge>
            {session.user.emailVerified && (
              <Badge variant="secondary" className="text-xs font-normal">
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Security Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="text-sm text-muted-foreground">Manage your security preferences</p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium">Current Session</h3>
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Monitor className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">Current Device</p>
                <Badge variant="secondary" className="text-xs font-normal bg-green-100 text-green-600 hover:bg-green-100 rounded-sm px-1.5 py-0 h-5">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Danger Zone</h2>
        <div className="rounded-lg border border-red-100 p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Delete your account</p>
            <p className="text-sm text-muted-foreground">
              Delete your account and all its associated data.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete your account? This action cannot be undone."
                )
              ) {
                void handleDeleteAccount();
              }
            }}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
