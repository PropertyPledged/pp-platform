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
import { signIn } from "@/lib/auth-client";

export default function CustomSignInForm() {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // Handle OAuth sign in
  const signInWith = async (provider: "google" | "apple" | "github") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Failed to sign in with " + provider);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email/password sign in
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: emailAddress,
        password,
      });

      if (result.data) {
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message ?? "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <div className="absolute left-8 top-8">
        <Logo />
      </div>

      <div className="mt-20 flex w-full max-w-[400px] flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
          <p className="text-muted-foreground text-sm">
            Sign into your account with your preferred social media account
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 gap-2 h-12"
            onClick={() => signInWith("google")}
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
            onClick={() => signInWith("apple")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.403-2.363-2-.039-3.714 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full gap-2 h-12"
          onClick={() => signInWith("github")}
          disabled={isLoading}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </Button>

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
            <Label htmlFor="email">Sign in with your email</Label>
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
              placeholder="Enter your password"
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
            {isLoading ? "Signing in..." : "Sign into my account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#001F3F] hover:underline"
          >
            Sign up here
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
