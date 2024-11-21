import Pagination from "@/components/Pagination";
import CardBlogPost from "@/components/blogs/CardBlogPost";
import SearchBlog from "@/components/SearchBlog";
import CategoriesList from "@/components/CategoriesList";
import { getBlogPosts } from "@/lib/actions";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";

export default async function Home({
  searchParams,
}: {
  // searchParams?: { [key: string]: string | string[] | undefined };
  searchParams?: { page?: number; search?: string };
}) {
  const page = searchParams?.page ?? 1;
  const search = searchParams?.search;

  const { count, data: blogs } = await getBlogPosts({ page, search });

  return (
    <main className="max-w-[1024px] min-w-[1024px] w-full mx-auto">
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
      <SearchBlog />
      <p className="py-2 px-4 bg-zinc-300 dark:bg-zinc-800 w-fit">
        Latest Posts
      </p>
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
