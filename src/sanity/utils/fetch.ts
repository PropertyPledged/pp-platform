import { env } from "@/env";
import type { QueryParams } from "next-sanity";
import "server-only";
import { client } from "../lib/client";

export const token = env.SANITY_VIEWER_TOKEN;

type FetchOptions = {
  query: string;
  params?: QueryParams;
  draftEnabled?: boolean;
};

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  draftEnabled = false,
}: FetchOptions) {
  const perspective = draftEnabled ? "previewDrafts" : "published";
  if (perspective === "previewDrafts") {
    return client.fetch<QueryResponse>(query, params, {
      token,
      perspective,
      useCdn: false,
      next: { revalidate: 0 },
      stega: true || process.env.VERCEL_ENV === "preview",
    });
  }

  return client.fetch<QueryResponse>(query, params, {
    token,
    perspective,
    useCdn: true,
    next: { revalidate: 60 },
    stega: false || process.env.VERCEL_ENV === "preview",
  });
}
