import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // const hello = await api.post.hello({ text: "from tRPC" });
  console.log("searchParams", searchParams);

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary/70">
        Hello world from tRPC
        <Link href="/about">About</Link>
        {JSON.stringify(searchParams, null, 3)}
        <Button>Shadcn ui button</Button>
      </main>
    </HydrateClient>
  );
}
