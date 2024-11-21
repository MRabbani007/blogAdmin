import Image from "next/image";
import Link from "next/link";
import React from "react";
import { genDate } from "@/lib/date";
import { BlogPost } from "@prisma/client";

interface Props {
  blog: BlogPost;
}

export default function CardBlogPost({ blog }: Props) {
  return (
    <div className="flex items-stretch gap-4">
      <div className="w-[300px] h-[180px] relative rounded-lg overflow-clip">
        <Image
          src={blog?.banner ?? "/post_icon.png"}
          alt="blog"
          fill
          className="object-cover w-full object-center"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <h2 className="font-normal text-2xl">
            <Link href={`/blog/${blog?.slug}`}>{blog?.title}</Link>
          </h2>
          <p className="font-light text-sm flex items-center gap-2">
            <span>Mohamad</span>
            <span>-</span>
            <span>Published</span>
            <span>{blog?.publishedAt?.toDateString()}</span>
          </p>
          <p className="py-1 px-2 text-xs mt-2 rounded-full text-zinc-800 bg-zinc-300 w-fit">
            {blog.category}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs dark:text-zinc-200 text-zinc-800">
          {blog?.tags.map((tag) => (
            <span
              key={tag}
              className="py-1 px-2 bg-zinc-200 dark:bg-zinc-800 rounded-full"
            >{`#${tag}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
