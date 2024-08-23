import React from "react";

export default function TopicsPage() {
  return (
    <main>
      <header className="">
        <p className="nunito-sans text-3xl">
          <span className="text-purple-600 font-semibold">Published </span>
          <span>Blogs </span>
        </p>
        <p className="text-purple-700 font-extralight text-xl">Admin Panel</p>
      </header>
      <table className="w-full text-center">
        <thead>
          <tr className="bg-zinc-900">
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Published</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </main>
  );
}
