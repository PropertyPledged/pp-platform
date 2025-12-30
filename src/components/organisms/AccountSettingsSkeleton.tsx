import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountSettingsSkeleton() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      {/* Header */}
      <div>
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Email Addresses Section */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-64" />
              {i === 1 && <Skeleton className="h-5 w-16 rounded-full" />}
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-40" />
      </div>

      <Separator />

      {/* Accounts Section */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Security Section */}
      <div className="space-y-4">
        <div>
          <Skeleton className="mb-1 h-7 w-24" />
          <Skeleton className="h-4 w-56" />
        </div>

        <div className="space-y-4 pt-2">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Skeleton className="mt-1 h-6 w-6 rounded-md" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between rounded-lg border border-red-100 p-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
