import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import ListWrapper from "@/components/atoms/ListWrapper";
import Text from "@/components/atoms/Text";
import BreadCrumbs from "@/components/molecules/BreadCrumbs";
import Post from "@/components/molecules/Post";
import Share from "@/components/molecules/Share";
import ContentReader from "@/components/sanity/ContentReader";
import { sanityFetch } from "@/sanity/utils/fetch";
import { urlForImage } from "@/sanity/utils/image";
import { allPostsQuery, postQuery } from "@/sanity/utils/queries";
import { format } from "date-fns";
import type { ResolvingMetadata } from "next";
import type { AllPostsQueryResult, PostQueryResult } from "sanity.types";
import { draftMode } from "next/headers";
import Image from "next/image";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const { slug } = await params;
  const post = await sanityFetch<PostQueryResult>({
    query: postQuery,
    params: { slug },
  });

  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: post?.title ?? "Blog Post",
    description: post?.excerpt ?? "Read our latest blog post.",
    openGraph: {
      title: post?.title ?? "Blog Post",
      description: post?.excerpt ?? "Read our latest blog post.",
      images: previousImages,
      authors: [post?.author?.name ?? ""],
      publishedTime: post?.publishedAt ?? "",
    },
  };
}

export async function generateStaticParams() {
  const posts = await sanityFetch<AllPostsQueryResult>({
    query: allPostsQuery,
  });

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const post = await sanityFetch<PostQueryResult>({
    query: postQuery,
    params: { slug },
    draftEnabled: isEnabled,
  });

  const allPosts = await sanityFetch<AllPostsQueryResult>({
    query: allPostsQuery,
    draftEnabled: isEnabled,
  });

  // format allPosts
  const morePosts = allPosts
    .filter((post) => post?.slug?.current !== slug)
    .slice(0, 3); // only take 3 posts

  const imageSrc = post?.mainImage ? urlForImage(post?.mainImage) : "";
  return (
    <div className="mx-auto min-h-screen max-w-screen-lg grid-cols-1 space-y-6 px-6 py-12 xl:px-0">
      <div className="space-y-4">
        <Animate dir="down" duration={0.6}>
          <BreadCrumbs />
        </Animate>
        <Animate dir="down" className="space-y-3">
          <Heading className="max-w-3xl">
            {post?.title ?? "Blog Post ...."}
          </Heading>
          <div className="flex items-center justify-between gap-2">
            <div className="text-sans space-x-2 text-gray-500">
              <span>{post?.author?.name}</span>
              <span>&bull;</span>
              <span>
                {format(new Date(post?._createdAt ?? ""), "MMM dd, yyyy")}
              </span>
            </div>
            <Text className="text-sm font-semibold text-gray-600">
              {post?.readTime} min read
            </Text>
          </div>
        </Animate>
        <Animate
          dir="up"
          className="h-[50vh] w-full overflow-hidden rounded-2xl"
        >
          <Image
            width={500}
            height={500}
            src={imageSrc}
            alt={post?.mainImage?.alttext ?? ""}
            className="h-full w-full object-cover"
          />
        </Animate>

        <Animate
          dir="up"
          useObserver={false}
          initiallyVisible={true}
          className="max-w-screen-lg"
        >
          <ContentReader content={post?.body} />
        </Animate>

        <Animate dir="up">
          <Share title={post?.title ?? ""} />
        </Animate>

        <Animate dir="up">
          <section id="more-posts" className="space-y-6 py-10">
            <Heading as="h3" className="font-semibold xl:text-3xl">
              More blog posts
            </Heading>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ListWrapper list={morePosts} keyExtractor={(post) => post._id}>
                {(post) => <Post post={post} />}
              </ListWrapper>
            </div>
          </section>
        </Animate>
      </div>
    </div>
  );
}

export default BlogPage;
