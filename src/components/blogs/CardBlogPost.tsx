import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MetaData } from "../../../types";
import { genDate } from "@/lib/date";

interface Props {
  blog: MetaData;
}

export default function CardBlogPost({ blog }: Props) {
  return (
    <div className="text-primary bg-primary-foreground flex items-stretch">
      <div className="w-52 p-2">
        <Image
          src={blog?.banner ?? "/post_icon.png"}
          alt="blog"
          width={360}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex-1 p-4">
          <h2 className="font-normal text-2xl">
            <Link href={`/blog/${blog?.slug}`}>{blog?.title}</Link>
          </h2>
          <p className="font-light text-sm flex items-center gap-4">
            <span>Mohamad</span>
            <span>-</span>
            <span>Published</span>
            <span>{genDate(blog?.publishedAt)}</span>
          </p>
        </div>
        <div className="space-x-4 p-4 text-sm text-zinc-200 ">
          {blog?.tags.map((tag) => (
            <span
              key={tag}
              className="py-2 px-4 bg-zinc-400 dark:bg-zinc-800"
            >{`#${tag}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
