import { getBlogPosts } from "@/lib/actions";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import Link from "next/link";

export default async function FeaturedBlogs() {
  const { data } = await getBlogPosts({ page: 1, featured: true });
  return (
    <div>
      <div className="text-4xl font-semibold mx-4">Featured Posts</div>
      <Carousel className="w-full group">
        <CarouselContent>
          {data.map((post, idx) => (
            <CarouselItem key={idx} className="">
              <div className="flex items-stretch m-4 rounded-lg overflow-clip shadow-md shadow-zinc-800">
                <div className="h-full w-auto min-w-[300px] min-h-[200px] relative">
                  <Image
                    src={post.banner ?? "/blog.png"}
                    alt="banner"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2 flex-1 px-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-light flex items-center">
                      <span>Mohamad, </span>
                      <span>
                        {post.publishedAt?.toISOString().substring(0, 10)}
                      </span>
                    </p>
                    <p className="py-1 px-2 bg-zinc-300 dark:text-zinc-900 rounded-full text-xs font-medium">
                      {post.category}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-3xl font-semibold">{post.title}</p>
                    <p className="line-clamp-2">{post.summary}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <p className="flex items-center text-zinc-500 gap-2">
                      <IoEyeSharp size={20} />
                      <span>{post.viewsCount}</span>
                      <AiFillLike size={20} className="text-yellow-600 ml-4" />
                      <span className="text-yellow-600 mr-4">
                        {post.likesCount}
                      </span>
                      <FaComment size={20} className="text-sky-600" />
                      <span className="text-sky-600">{post.commentsCount}</span>
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="underline ml-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300" />
        <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300" />
      </Carousel>
    </div>
  );
}
