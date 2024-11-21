import React from "react";
import RelatedPostCard from "./RelatedPostCard";
import { notFound } from "next/navigation";
import { getBlogByName } from "@/lib/firebase";
import { getRelatedPosts } from "@/lib/actions";

interface Props {
  slug: string;
}

export default async function RelatedPosts({ slug }: Props) {
  const { data } = await getRelatedPosts(decodeURIComponent(slug));

  return (
    <div>
      <h2 className="text-2xl my-2">Related Posts</h2>
      <div className=" overflow-x-auto">
        <div className="flex items-stretch gap-4 py-2">
          {data.map((item, idx) => (
            <RelatedPostCard blog={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
