"use client";

import Pagination from "@/components/Pagination";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";

export default function DraftBlogsPage() {
  const [page, setPage] = useState(1);

  return (
    <main>
      <div className="flex items-start gap-4 justify-between">
        <div className="">
          <p className="nunito-sans text-3xl">
            <span className="text-purple-600 font-semibold">Draft </span>
            <span>Blogs </span>
          </p>
          <p className="text-purple-700 font-extralight text-xl">Admin Panel</p>
        </div>
        <div className="flex items-center gap-2 text-purple-600">
          <MdOutlinePending size={24} />
          <span>/</span>
          <span>Drafts</span>
        </div>
      </div>
      <div className="flex-1">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-zinc-900">
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="">#</td>
              <td className="">Title</td>
              <td className="">Slug</td>
              <td className="">
                <div className="flex items-center justify-center gap-4">
                  <Link href={`/admin/blogs/edit/${""}`}>
                    <FaEdit size={24} />
                  </Link>
                  <Link href={`/admin/blogs/edit/${""}`}>
                    <FaRegTrashAlt size={24} />
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} count={30} />
    </main>
  );
}
