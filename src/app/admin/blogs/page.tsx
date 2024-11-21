import React from "react";
import DashboardBlogPostCard from "@/components/admin/DashboardBlogPostCard";
import SearchBlog from "@/components/SearchBlog";
import Pagination from "@/components/Pagination";
import { getBlogPosts } from "@/lib/actions";

type Props = {
  searchParams: {
    page?: number;
    search?: string;
  };
};

export default async function BlogsPage({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const search = searchParams?.search;

  const { count, data } = await getBlogPosts({
    page,
    search,
    status: "PUBLISHED",
  });

  return (
    <main className="flex-1">
      <header className="">
        <p className="nunito-sans text-3xl">
          <span className="text-sky-600 font-semibold">Published </span>
          <span>Blogs</span>
        </p>
        <p className="text-sky-600/80 font-extralight text-xl">Admin Panel</p>
      </header>
      <SearchBlog />
      <div className="flex-1 space-y-4">
        {data &&
          data.map((blog, idx) => (
            <DashboardBlogPostCard
              blog={JSON.parse(JSON.stringify(blog))}
              idx={idx}
              key={idx}
            />
          ))}
        {!data || (data && data.length === 0) ? (
          <p>No published blogs</p>
        ) : null}
      </div>
      <Pagination activePage={page} count={count} />
    </main>
  );
}
