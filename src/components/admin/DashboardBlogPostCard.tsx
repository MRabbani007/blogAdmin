"use client";

import React, { FormEvent } from "react";
import Link from "next/link";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteDocument, deleteFile } from "@/lib/firebase";
import Image from "next/image";
import { CiCircleMore } from "react-icons/ci";
import {
  IoIosRemoveCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { genDate } from "@/lib/date";
import { MetaData } from "../../../types";
import { formatDistance } from "date-fns";

type Params = {
  blog: MetaData;
  idx: number;
};

export default function DashboardBlogPostCard({ blog, idx }: Params) {
  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();

    if (confirm("Delete this blog?")) {
      await deleteFile(blog.pathname);

      await deleteDocument(blog?.id);
    }
  };

  return (
    <div className="flex items-stretch gap-4 p-4 bg-zinc-300 dark:bg-zinc-900 rounded-lg">
      <div className="h-28 w-auto">
        <Image
          src={blog?.banner ?? "/blog.png"}
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
            <span>{blog.title}</span>
          </p>
          <p className="text-sm font-light flex items-center gap-4">
            <span>Created: </span>
            <span title="Updated">
              {new Date(
                (blog.createdAt?.seconds ?? 0) * 1000 +
                  (blog.createdAt?.nanoseconds ?? 0) / 1000000
              ).toDateString()}
              {/* {genDate(blog?.updatedAt)} */}
            </span>
            <span> - Updated: </span>
            <span title="">
              {/* {.toLocaleDateString("en-UK")} */}
              {formatDistance(
                new Date(
                  (blog.updatedAt?.seconds ?? 0) * 1000 +
                    (blog.updatedAt?.nanoseconds ?? 0) / 1000000
                ),
                new Date(),
                { addSuffix: true }
              )}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div title={"Status: " + blog?.status}>
            {blog?.status === "published" ? (
              <IoMdCheckmarkCircleOutline size={30} />
            ) : blog?.status === "draft" ? (
              <CiCircleMore size={30} />
            ) : blog?.status === "archived" ? (
              <IoIosRemoveCircleOutline size={30} />
            ) : null}
          </div>
          {/* <span className="mr-2">Status: {blog.status}</span> */}
          <span title={"Category: " + blog?.category}>{blog?.category}</span>
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
      <div className="flex items-center justify-center gap-4">
        <Link href={`/admin/blogs/${blog.slug}`}>
          <FaEdit size={24} />
        </Link>
        <form onSubmit={handleDelete}>
          <button>
            <FaRegTrashAlt size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
