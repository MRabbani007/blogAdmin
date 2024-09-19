import SearchBlog from "@/components/SearchBlog";
import DashboardBlogPostCard from "@/components/admin/DashboardBlogPostCard";
import CardBlogPost from "@/components/blogs/CardBlogPost";
import { searchBlogs } from "@/lib/firebase";
import React from "react";

export default async function SearchPage({
  params,
}: {
  params: { slug: string };
}) {
  //   if (!params?.slug) return null;

  const result = await searchBlogs(decodeURIComponent(params?.slug ?? ""));

  const { count, blogs } = result;

  return (
    <main>
      <SearchBlog />
      <div className="flex-1 space-y-4">
        {blogs &&
          blogs.map((blog, idx) => <CardBlogPost blog={blog} key={idx} />)}
        {!blogs || (blogs && blogs.length === 0) ? (
          <p>No published blogs</p>
        ) : null}
      </div>
    </main>
  );
}
