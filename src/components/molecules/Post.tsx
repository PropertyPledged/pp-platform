import { urlForImage } from "@/sanity/utils/image";
import type { PostQueryResult } from "sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";

function Post({ post }: { post: PostQueryResult }) {
  if (!post) return null;
  const imageSrc = post?.mainImage ? urlForImage(post?.mainImage) : "";
  return (
    <div className="h-auto space-y-4">
      <div className="h-80 w-full overflow-hidden rounded-xl">
        <Image
          width={500}
          height={500}
          src={imageSrc}
          alt={post.mainImage?.alttext ?? ""}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <Link href={`/blog/${post?.slug?.current}`} className="hover:underline">
          <Heading as="h3" className="font-semibold">
            {post.title}
          </Heading>
        </Link>
        <Text className="text-gray-600">{post?.excerpt}</Text>
      </div>
      <div className="space-x-2 text-gray-600">
        <span>{post?.author?.name}</span>
        <span>&bull;</span>
        <span>{post?.readTime} min read</span>
      </div>
    </div>
  );
}

export default Post;
