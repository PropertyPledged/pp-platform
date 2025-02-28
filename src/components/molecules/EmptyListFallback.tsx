import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ListX } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EmptyListFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  message?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export const EmptyListFallback = ({
  title = "No Items Found",
  description = "It looks like there aren't any items available at the moment.",
  message = "Check back soon for new content or try adjusting your filters.",
  primaryAction = { label: "Return Home", href: "/" },
  secondaryAction,
  icon = <ListX size={64} className="text-gray-400" />,
  className,
  ...props
}: EmptyListFallbackProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-6",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 flex justify-center">{icon}</div>
          <CardTitle className="font-sans text-2xl font-bold">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-0 pt-0">
          <p className="mb-4 text-sm text-gray-500">{message}</p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="default" asChild>
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
          {secondaryAction && (
            <Button variant="outline" asChild>
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmptyListFallback;
