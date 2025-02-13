"use server";
import { getBlogPosts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function PopularPosts() {
  const { data } = await getBlogPosts({ page: 1 });

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">Popular Posts</h2>
      <div className="flex flex-col gap-2">
        {data.map((post) => (
          <div
            key={post.id}
            className="flex items-stretch gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md duration-200 p-2"
          >
            <div className="relative w-[180px] h-[100px]">
              <Image
                src={post.banner ?? "/blog.png"}
                alt="banner"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="overflow-hidden flex-1 py-1 flex flex-col">
              <p className="text-sm text-ellipsis font-semibold">
                {post.title}
              </p>
              <p className="text-xs text-light">
                <span>Mohamad - </span>
                <span>{post.publishedAt?.toISOString().substring(0, 10)}</span>
              </p>
              <Link
                className="text-sm underline mt-auto"
                href={`/blog/${post.slug}`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
