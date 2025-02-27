import { urlForImage } from "@/sanity/utils/image";
import type { PostQueryResult } from "sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Animate from "../atoms/Animate";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import { Card, CardContent } from "../ui/card";
import { CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

type FeaturedPostProps = {
  idx: number;
  postsCount: number;
  post: PostQueryResult;
};

function FeaturedPost({ post, idx, postsCount }: FeaturedPostProps) {
  const src = post?.mainImage ? urlForImage(post?.mainImage) : "";
  return (
    <CarouselItem
      key={post?._id}
      className="h-[50vh] w-full rounded-xl pl-0 lg:h-[55vh]"
    >
      <Animate dir="up" duration={0.3} className="h-full w-full">
        <Card className="relative h-full overflow-hidden rounded-none border-none px-0">
          <Image
            src={src}
            width={500}
            height={500}
            alt={post?.mainImage?.alttext ?? ""}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex w-full items-end bg-black/50 p-6 lg:p-16">
            <CardContent className="flex h-auto w-full justify-start">
              <div className="flex w-full flex-col items-end justify-between lg:flex-row">
                <Animate
                  dir="up"
                  className="mx-none max-w-xl space-y-5 2xl:max-w-2xl"
                >
                  <div className="flex items-center gap-2 text-lg font-light text-white">
                    <hr className="w-8 border-white" /> <Text>Featured</Text>
                  </div>
                  <Link
                    passHref
                    href={`/blog/${post?.slug?.current ?? "/blog"}`}
                  >
                    <Heading className="underline-8 text-xl text-white hover:underline lg:text-2xl 2xl:text-3xl">
                      {post?.title ?? ""}
                    </Heading>
                  </Link>
                  <Text className="text-base text-gray-200">
                    {post?.excerpt}
                  </Text>
                  <div className="space-x-2 text-sm text-gray-300">
                    <span>{post?.author?.name}</span>
                    <span>&bull;</span>
                    <span>{post?.readTime} min read</span>
                  </div>
                </Animate>
                <div className="flex items-center justify-center px-6">
                  {idx === 0 ? null : (
                    <CarouselPrevious className="relative size-14 border-2 text-white hover:bg-white/30 hover:text-white hover:backdrop-blur-sm" />
                  )}
                  {postsCount < 1 || idx === postsCount - 1 ? null : (
                    <CarouselNext className="relative size-14 border-2 text-white hover:bg-white/30 hover:text-white hover:backdrop-blur-sm" />
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Animate>
    </CarouselItem>
  );
}

export default FeaturedPost;
