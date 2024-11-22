"use client";

import Link from "next/link";
import Image from "next/image";
import { CiCircleMore } from "react-icons/ci";
import {
  IoIosRemoveCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { BlogPost } from "@prisma/client";

type Params = {
  blog: BlogPost;
  idx: number;
};

export default function DashboardBlogPostCard({ blog, idx }: Params) {
  return (
    <div className="flex items-stretch gap-4">
      <div className="relative w-[300px] h-[200px]">
        <Image
          src={!blog?.banner || blog?.banner === "" ? "/blog.png" : blog.banner}
          alt="icon"
          fill
          className="object-cover object-center rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col py-2">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-2xl">
              {/* <span title="SortIndex">{blog.sortIndex}</span> */}
              <Link href={`/admin/blogs/${blog.slug}`}>{blog.title}</Link>
            </p>
            <p
              title={"Category: " + blog?.category}
              className="bg-zinc-200 py-2 px-4 text-sm rounded-full"
            >
              {blog?.category}
            </p>
          </div>
          <p className="text-sm font-light flex items-center gap-2">
            <span>Created: </span>
            <span title="Created">
              {blog?.createdAt.toString().substring(0, 10)}
            </span>
            <span>Updated: </span>
            <span title="Updated">
              {blog?.updatedAt.toString().substring(0, 10)}
            </span>
            <span>Published: </span>
            <span title="Updated">
              {blog?.publishedAt?.toString().substring(0, 10)}
            </span>
          </p>
          <p className="line-clamp-3 my-2">{blog.summary}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          {/* <span className="mr-2">Status: {blog.status}</span> */}
          <div className="mt-2 flex items-center text-sm gap-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="py-1 px-4 bg-zinc-200 text-sm rounded-full"
              >
                {`#${tag}`}
              </span>
            ))}
          </div>
          <div
            title={"Status: " + blog?.status}
            className="flex items-center gap-2 bg-zinc-200 p-2 text-sm rounded-md"
          >
            {blog?.status === "PUBLISHED" ? (
              <IoMdCheckmarkCircleOutline size={20} />
            ) : blog?.status === "DRAFT" ? (
              <CiCircleMore size={20} />
            ) : blog?.status === "ARCHIVED" ? (
              <IoIosRemoveCircleOutline size={20} />
            ) : null}
            <span>{blog.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
