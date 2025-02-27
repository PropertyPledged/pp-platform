"use client";

import { disableDraftMode } from "@/server/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (window !== window.parent || !!window.opener) {
    return null;
  }

  const disable = () =>
    startTransition(() => {
      disableDraftMode()
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          throw error;
        });
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  );
}
