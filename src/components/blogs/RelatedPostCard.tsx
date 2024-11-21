import Image from "next/image";
import React from "react";
import { BlogPost } from "@prisma/client";

interface Props {
  blog: BlogPost;
}

export default function RelatedPostCard({ blog }: Props) {
  return (
    <div className="shadow-md shadow-zinc-200 rounded-lg overflow-clip shrink-0">
      <div className="w-[300px] h-[200px] relative">
        <Image
          src={blog.banner ?? "/post_icon.png"}
          alt="banner"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-2 text-ellipsis">{blog.title}</div>
    </div>
  );
}
