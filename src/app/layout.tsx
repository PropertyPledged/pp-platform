import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { VisualEditing } from "next-sanity";
import NextTopLoader from "nextjs-toploader";
import { Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Property Pledged",
  description:
    "Discover transparent, reliable feedback on properties and landlords helping you avoid common pitfalls and find your perfect rental.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={poppins.className}>
        <ClerkProvider>
          <NextTopLoader color="#001F3F" />
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}

export default RootLayout;
