import React from "react";
import RelatedPostCard from "./RelatedPostCard";
import { notFound } from "next/navigation";
import { getBlogByName } from "@/lib/firebase";

interface Params {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function RelatedPosts({ params }: Params) {
  if (!params.slug) notFound();

  const blog = await getBlogByName(decodeURIComponent(params.slug));

  const data = blog?.data;

  if (!data) notFound();

  const blogs = Array(4).fill(data);

  return (
    <div>
      <h2 className="text-2xl my-2">Related Posts</h2>
      <div className="flex items-center gap-4">
        {blogs.map((item, idx) => (
          <RelatedPostCard blog={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
