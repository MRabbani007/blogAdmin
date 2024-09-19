import SearchBlog from "@/components/SearchBlog";
import DashboardBlogPostCard from "@/components/admin/DashboardBlogPostCard";
import { getBlogsAdmin } from "@/lib/firebase";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";

export default async function DraftBlogsPage() {
  const { count, blogs } = await getBlogsAdmin(1, "draft");

  return (
    <main>
      <div className="flex items-start gap-4 justify-between">
        <div className="">
          <p className="nunito-sans text-3xl">
            <span className="text-accent font-semibold">Draft </span>
            <span>Blogs </span>
          </p>
          <p className="text-accent/80 font-extralight text-xl">Admin Panel</p>
        </div>
        <div className="flex items-center gap-2 text-accent">
          <MdOutlinePending size={24} />
          <span>/</span>
          <span>Drafts</span>
        </div>
      </div>
      <SearchBlog />
      <div className="flex-1">
        <div className="flex-1 space-y-4">
          {blogs &&
            blogs.map((blog, idx) => (
              <DashboardBlogPostCard
                blog={JSON.parse(JSON.stringify(blog))}
                idx={idx}
                key={idx}
              />
            ))}
          {!blogs || (blogs && blogs.length === 0) ? (
            <p>No draft blogs</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
