import Image from "next/image";
import React from "react";
import { MetaData } from "../../../types";

interface Props {
  blog: MetaData;
}

export default function RelatedPostCard({ blog }: Props) {
  return (
    <div className="shadow-md shadow-zinc-200 rounded-lg">
      <div className="min-w-32">
        <Image
          src={blog.banner ?? "/post_icon.png"}
          alt="banner"
          width={1920}
          height={1080}
          className="w-full h-full"
        />
      </div>
      <div className="p-2">{blog.title}</div>
    </div>
  );
}
