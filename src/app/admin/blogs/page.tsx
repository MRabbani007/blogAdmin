import Pagination from "@/components/Pagination";
import SearchBlog from "@/components/SearchBlog";
import { getBlogs } from "@/lib/firebase";
import React from "react";
import BlogCard from "./BlogCard";
import { MetaData } from "../../../../types";

const BLOGS = [
  { id: "1", title: "First Blog", slug: "First_Blog", status: "draft" },
  { id: "2", title: "Second Blog", slug: "Second_Blog", status: "draft" },
  { id: "3", title: "Third Blog", slug: "Third_Blog", status: "draft" },
];

export default async function BlogsPage() {
  // const [page, setPage] = useState(1);

  let page = 1;
  const setPage = (p: number) => (page = p);
  const blogs: MetaData[] = await getBlogs();

  return (
    <main className="flex-1">
      <header className="">
        <p className="nunito-sans text-3xl">
          <span className="text-purple-600 font-semibold">Published </span>
          <span>Blogs </span>
        </p>
        <p className="text-purple-700 font-extralight text-xl">Admin Panel</p>
      </header>
      <SearchBlog />
      <div className="flex-1 space-y-4">
        {blogs &&
          blogs.map((blog, idx) => (
            <BlogCard
              blog={JSON.parse(JSON.stringify(blog))}
              idx={idx}
              key={idx}
            />
          ))}
        {!blogs || (blogs && blogs.length === 0) ? <p>No blogs</p> : null}
      </div>
      {/* <Pagination page={page} setPage={setPage} count={30} /> */}
    </main>
  );
}
