"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [reason, setReason] = useState<string>("too-many");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async () => {
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would make an API call like:
      // await fetch('/api/unsubscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, token, reason, feedback }),
      //   headers: { 'Content-Type': 'application/json' }
      // });

      setStatus("success");
    }, 1500);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 flex items-center">
            <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Email Preferences</CardTitle>
          </div>
          <CardDescription>
            {status === "success"
              ? "You have been successfully unsubscribed."
              : "Manage your email subscription preferences"}
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {status === "idle" && (
            <>
              <div className="mb-6">
                <p className="mb-1 text-sm font-medium">Email Address</p>
                <p className="break-all text-sm text-muted-foreground">
                  {email || "user@example.com"}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-sm font-medium">
                    Please tell us why you&apos;re unsubscribing:
                  </h3>
                  <RadioGroup
                    defaultValue="too-many"
                    value={reason}
                    onValueChange={setReason}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="too-many" id="too-many" />
                      <Label
                        htmlFor="too-many"
                        className="cursor-pointer font-normal"
                      >
                        I receive too many emails
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="not-relevant" id="not-relevant" />
                      <Label
                        htmlFor="not-relevant"
                        className="cursor-pointer font-normal"
                      >
                        The content isn&apos;t relevant to me
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="never-signed" id="never-signed" />
                      <Label
                        htmlFor="never-signed"
                        className="cursor-pointer font-normal"
                      >
                        I never signed up for this mailing list
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label
                        htmlFor="other"
                        className="cursor-pointer font-normal"
                      >
                        Other reason
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="feedback" className="text-sm font-medium">
                    Additional feedback (optional)
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us how we can improve..."
                    className="mt-1.5"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
              <p className="text-center text-sm text-muted-foreground">
                Processing your request...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="mb-4 h-10 w-10 text-green-500" />
              <h3 className="mb-2 text-center text-lg font-medium">
                Successfully Unsubscribed
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                You have been removed from our mailing list. You will no longer
                receive marketing emails from us.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertTriangle className="mb-4 h-10 w-10 text-amber-500" />
              <h3 className="mb-2 text-center text-lg font-medium">
                Something went wrong
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                We couldn&apos;t process your request. Please try again or
                contact support.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          {(status === "idle" || status === "error") && (
            <>
              <Button
                variant="default"
                className="w-full sm:w-auto"
                onClick={handleSubmit}
                // disabled={status === "loading"}
              >
                Unsubscribe
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </>
          )}

          {status === "success" && (
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to homepage
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
