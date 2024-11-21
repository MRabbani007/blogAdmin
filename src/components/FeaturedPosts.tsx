import Image from "next/image";
import React from "react";

export default function FeaturedPosts() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[200px] w-[400px] shadow-md shadow-zinc-700 rounded-md">
        <Image src="/blog.png" alt="No Image" fill className="object-contain" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p>
          <span>Mohamad - </span>
          <span>{new Date().toDateString()}</span>
        </p>
        <p className="text-base text-zinc-600">
          Asperiores sapiente corrupti, amet fuga deserunt itaque beatae
          dignissimos aperiam repellat rem quis illum officia dolor explicabo
          ducimus rerum ea, illo quas!
        </p>
      </div>
    </div>
  );
}
