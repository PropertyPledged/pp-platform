import { cn } from "@/lib/utils";
import { ShieldCheck, Users } from "lucide-react";

interface VerificationBadgeProps {
  isVerified: boolean;
  className?: string;
}

export const VerificationBadge = ({ isVerified, className }: VerificationBadgeProps) => {
  if (isVerified) {
    return (
      <div className={cn("inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20", className)}>
        <ShieldCheck className="h-3.5 w-3.5" />
        Verified Resident
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10", className)}>
      <Users className="h-3.5 w-3.5" />
      Community Member
    </div>
  );
};
