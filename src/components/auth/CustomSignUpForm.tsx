"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/atoms/Logo";
import { toast } from "sonner";
import { signUp, signIn, verifyEmail } from "@/lib/auth-client";

export default function CustomSignUpForm() {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // Handle OAuth sign up
  const signUpWith = async (provider: "google" | "apple") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Failed to sign up with " + provider);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email/password sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp.email({
        email: emailAddress,
        password,
        name,
      });

      if (result.data) {
        setVerifying(true);
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email verification
  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await verifyEmail({
        query: {
          token: code,
        },
      });

      if (result.data) {
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message ?? "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 p-8">
        <div className="mb-8">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
        <p className="text-muted-foreground text-center text-sm">
          We sent a code to <span className="font-medium">{emailAddress}</span>
        </p>
        <form
          onSubmit={handleVerification}
          className="w-full max-w-sm space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#001F3F] text-white hover:bg-[#001F3F]/90"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <div className="absolute left-8 top-8">
        <Logo />
      </div>

      <div className="mt-20 flex w-full max-w-[400px] flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign up quickly with your preferred social media account
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 gap-2 h-12"
            onClick={() => signUpWith("google")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2 h-12"
            onClick={() => signUpWith("apple")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.403-2.363-2-.039-3.714 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">Or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Sign up with your email</Label>
            <div className="space-y-1">
              <Label htmlFor="email" className="sr-only">
                Your email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="janedoe@gmail.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                className="h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full bg-[#001F3F] text-white hover:bg-[#001F3F]/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create my account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#001F3F] hover:underline"
          >
            Login here
          </Link>
        </div>

        <div className="mt-auto text-center text-xs text-muted-foreground">
          <p>
            <span className="font-semibold text-[#001F3F]">
              We value your privacy.
            </span>{" "}
            Your information is secure and will not be shared without your
            permission.
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Property Pledge 2024
        </div>
      </div>
    </div>
  );
}
