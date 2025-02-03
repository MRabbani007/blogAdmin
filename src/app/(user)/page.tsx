import Pagination from "@/components/Pagination";
import CardBlogPost from "@/components/blogs/CardBlogPost";
import SearchBlog from "@/components/SearchBlog";
import CategoriesList from "@/components/CategoriesList";
import { getBlogPosts } from "@/lib/actions";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  // searchParams?: { [key: string]: string | string[] | undefined };
  searchParams?: { page?: number; search?: string; category?: string };
}) {
  const page = searchParams?.page ?? 1;
  const search = searchParams?.search;
  const category = searchParams?.category;

  const { count, data: blogs } = await getBlogPosts({ page, search, category });

  return (
    <main className="max-w-[1024px] min-w-[1024px] w-full mx-auto gap-4">
      {/* <form className="flex items-center gap-4 border-2 border-zinc-800 rounded-lg py-2 px-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="flex-1 py-2 px-4 outline-none border-none bg-transparent"
        />
        <button type="submit">
          <IoSearch size={30} />
        </button>
      </form> */}
      <FeaturedBlogs />
      <CategoriesList />
      <SearchBlog className="" />
      <div className="flex items-center gap-4">
        <Link
          href={"/"}
          className={
            (category ? "" : "bg-zinc-300 dark:bg-zinc-800") +
            " py-2 px-4  w-fit hover:bg-zinc-200 duration-200"
          }
        >
          Latest Posts
        </Link>
        {category && (
          <p className="py-2 px-4 bg-zinc-300 dark:bg-zinc-800 w-fit">
            {category ? `Category: ${category}` : "Latest Posts"}
          </p>
        )}
      </div>
      <div className="space-y-6">
        {blogs.map((item, index) => (
          <CardBlogPost blog={item} key={index} />
        ))}
      </div>
      <div>
        <Pagination count={count} activePage={page} />
      </div>
    </main>
  );
}
