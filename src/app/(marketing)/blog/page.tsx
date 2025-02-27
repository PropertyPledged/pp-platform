import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import ListWrapper from "@/components/atoms/ListWrapper";
import Text from "@/components/atoms/Text";
import EmptyListFallback from "@/components/molecules/EmptyListFallback";
import Post from "@/components/molecules/Post";
import FeaturedPosts from "@/components/organisms/FeaturedPosts";
import { sanityFetch } from "@/sanity/utils/fetch";
import { postsQuery } from "@/sanity/utils/queries";
import type { PostsQueryResult } from "sanity.types";
import { draftMode } from "next/headers";
import React from "react";

async function Blogs() {
  const data = await sanityFetch<PostsQueryResult>({
    query: postsQuery,
    draftEnabled: (await draftMode()).isEnabled,
  });

  return (
    <div className="min-h-screen space-y-12 py-8 pb-28">
      <FeaturedPosts posts={data?.featuredPosts} />

      <section
        id="all-posts"
        className="mx-auto mt-12 max-w-screen-2xl space-y-8"
      >
        <Animate dir="up" duration={0.5} className="space-y-1">
          <Heading as="h2">Recent blogs </Heading>
          <Text variant="muted" className="max-w-md">
            Explore and learn more about the property world with our latest and
            exciting blogs.
          </Text>
        </Animate>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ListWrapper
            list={data?.posts}
            keyExtractor={(post) => post._id}
            renderFallback={() => (
              <Animate dir="up" duration={0.6}>
                <EmptyListFallback
                  title="No Blog Posts Found"
                  description="It looks like there aren't any blog posts available at the moment."
                  primaryAction={{ label: "Back to Blog Home", href: "/" }}
                  // secondaryAction={{ label: "Subscribe", href: "/subscribe" }}
                />
              </Animate>
            )}
          >
            {(post) => (
              <Animate key={post._id} dir="up" duration={0.5}>
                <Post post={post} />
              </Animate>
            )}
          </ListWrapper>
        </div>
      </section>
    </div>
  );
}

export default Blogs;
