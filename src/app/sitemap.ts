import { sanityFetch } from "@/sanity/utils/fetch";
import { allPostsQuery } from "@/sanity/utils/queries";
import type { MetadataRoute } from "next";
import type { AllPostsQueryResult } from "sanity.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://propertypledged.co.uk";
  // get the posts from the CMS and generate the sitemap
  const posts = await sanityFetch<AllPostsQueryResult>({
    query: allPostsQuery,
  });

  // update the format
  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post?.slug?.current}`,
    changeFrequency: "monthly" as const,
    lastModified: post?.publishedAt ? new Date(post?.publishedAt) : new Date(),
  }));

  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/suggestion`,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/about-us`,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    ...postUrls,
    {
      url: `${BASE_URL}/community`,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },
  ];
}
