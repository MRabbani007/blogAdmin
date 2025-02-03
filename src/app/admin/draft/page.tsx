import Pagination from "@/components/Pagination";
import SearchBlog from "@/components/SearchBlog";
import DashboardBlogPostCard from "@/components/admin/DashboardBlogPostCard";
import { getBlogPosts } from "@/lib/actions";
import { MdOutlinePending } from "react-icons/md";

type Props = {
  searchParams: {
    page?: number;
  };
};

export default async function DraftBlogsPage({ searchParams }: Props) {
  let page = searchParams.page ?? 1;

  const { count, data: blogs } = await getBlogPosts({
    page,
    status: "DRAFT",
  });

  return (
    <main>
      <div className="flex items-start gap-4 justify-between">
        <header className="">
          <p className="nunito-sans text-3xl">
            <span className="text-sky-600 font-semibold">Draft </span>
            <span>Blogs </span>
          </p>
          <p className="text-sky-600/80 font-extralight text-xl">Admin Panel</p>
        </header>
        <div className="flex items-center gap-2 text-sky-600">
          <MdOutlinePending size={25} />
          <span>/</span>
          <span>Drafts</span>
        </div>
      </div>
      <SearchBlog />
      <div className="flex-1 space-y-4">
        {blogs &&
          blogs.map((blog, idx) => (
            <DashboardBlogPostCard
              blog={JSON.parse(JSON.stringify(blog))}
              idx={idx}
              key={idx}
            />
          ))}
        {!blogs || (blogs && blogs.length === 0) ? <p>No draft blogs</p> : null}
      </div>
      <Pagination activePage={page} count={count} />
    </main>
  );
}
