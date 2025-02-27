import { Carousel, CarouselContent } from "@/components/ui/carousel";
import type { PostQueryResult } from "sanity.types";
import React from "react";
import ListWrapper from "../atoms/ListWrapper";
import FeaturedPost from "./FeaturedPost";

type FeaturedPostsProps = {
  posts: PostQueryResult[];
};

function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-center overflow-hidden rounded-lg">
      <Carousel className="w-full lg:h-[55vh] lg:rounded-lg">
        <CarouselContent className="ml-0 h-full w-full">
          <ListWrapper list={posts} keyExtractor={(post) => post?._id ?? ""}>
            {(post, idx) => (
              <FeaturedPost post={post} idx={idx} postsCount={posts.length} />
            )}
          </ListWrapper>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default FeaturedPosts;
