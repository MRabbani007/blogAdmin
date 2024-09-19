"use client";

import Link from "next/link";
import Image from "next/image";
import { CiCircleMore } from "react-icons/ci";
import {
  IoIosRemoveCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { genDate } from "@/lib/date";
import { MetaData } from "../../../types";

type Params = {
  blog: MetaData;
  idx: number;
};

export default function DashboardBlogPostCard({ blog, idx }: Params) {
  return (
    <div className="flex items-stretch gap-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
      <div className="h-28 w-auto">
        <Image
          src={!blog?.banner || blog?.banner === "" ? "/blog.png" : blog.banner}
          alt="icon"
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-2xl flex items-center gap-4">
            <span title="SortIndex">{blog.sortIndex}</span>
            <Link href={`/admin/blogs/${blog.slug}`}>{blog.title}</Link>
          </p>
          <p className="text-sm font-light flex items-center gap-4">
            <span>Created: </span>
            <span title="Created">{genDate(blog?.createdAt)}</span>
            <span> - Updated: </span>
            <span title="Updated">{genDate(blog?.updatedAt)}</span>
            <span> - Published: </span>
            <span title="Updated">{genDate(blog?.publishedAt)}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <span className="mr-2">Status: {blog.status}</span> */}
          <div className="mt-2 flex items-center gap-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="p-2 bg-zinc-200 dark:bg-zinc-800 text-sm"
              >
                {`#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-start gap-2">
        <div title={"Category: " + blog?.category} className="flex-1">
          {blog?.category}
        </div>
        <div
          title={"Status: " + blog?.status}
          className="flex items-center gap-2"
        >
          {blog?.status === "published" ? (
            <IoMdCheckmarkCircleOutline size={30} />
          ) : blog?.status === "draft" ? (
            <CiCircleMore size={30} />
          ) : blog?.status === "archived" ? (
            <IoIosRemoveCircleOutline size={30} />
          ) : null}
          <span>{blog.status}</span>
        </div>
      </div>
    </div>
  );
}
