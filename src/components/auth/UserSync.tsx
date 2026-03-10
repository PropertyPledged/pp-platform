"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { api } from "@/trpc/react";

export const UserSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const syncMutation = api.users.sync.useMutation();
  const lastSyncedRef = useRef<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      const syncKey = `${user.id}-${email}-${user.fullName}`;
      
      if (email && lastSyncedRef.current !== syncKey) {
        lastSyncedRef.current = syncKey;
        syncMutation.mutate({
          clerkId: user.id,
          email: email,
          name: user.fullName ?? undefined,
        });
      }
    }
  }, [isLoaded, isSignedIn, user, syncMutation]);

  return null;
};
