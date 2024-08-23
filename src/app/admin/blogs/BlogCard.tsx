"use client";

import React, { FormEvent } from "react";
import { MetaData } from "../../../../types";
import Link from "next/link";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteDocument, deleteFile } from "@/lib/firebase";
import Image from "next/image";

type Params = {
  blog: MetaData;
  idx: number;
};

export default function BlogCard({ blog, idx }: Params) {
  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();

    if (confirm("Delete this blog?")) {
      await deleteFile(blog.pathname);

      await deleteDocument(blog?.id);
    }
  };

  return (
    <div className="flex items-stretch gap-4 p-4 bg-zinc-900 rounded-lg">
      <div>
        <Image src={"/blog.png"} alt="icon" width={80} height={80} />
      </div>
      <div className="flex-1">
        <p className="text-2xl">{blog.title}</p>
        <p className="text-sm font-light">
          {new Date(
            (blog.createdAt?.seconds ?? 0) * 1000 +
              (blog.createdAt?.nanoseconds ?? 0) / 1000000
          ).toDateString()}
        </p>
        <p className="">
          <span className="mr-2">Status: {blog.status}</span>
          <span>Topic: {blog.category}</span>
        </p>
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
