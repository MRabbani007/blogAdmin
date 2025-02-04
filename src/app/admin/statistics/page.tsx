import Pagination from "@/components/Pagination";
import { getAllVisitors } from "@/lib/statistics";
import React from "react";

interface Visitor {
  id: string;
  visitorId: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  referrer?: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
}

export default async function StatisticsPage({
  searchParams,
}: {
  // searchParams?: { [key: string]: string | string[] | undefined };
  searchParams?: { page?: number; search?: string };
}) {
  const page = searchParams?.page ?? 1;

  const response = await getAllVisitors(page);

  if (response?.success !== true) {
    return <p>Failed to fetch visitors data</p>;
  }

  const visitors = response?.data ?? [];
  const count = response?.count ?? 0;

  if (visitors?.length === 0) {
    return <div>No visitors found.</div>;
  }

  return (
    <main>
      <div className="flex items-start gap-4 justify-between">
        <header className="">
          <p className="nunito-sans text-3xl">
            <span className="text-sky-600 font-semibold">Statistics </span>
            <span>Visitors </span>
          </p>
          <p className="text-sky-600/80 font-extralight text-xl">Admin Panel</p>
        </header>
        <div className="flex items-center gap-2 text-sky-600">
          <span>/</span>
          <span>Statistics</span>
        </div>
      </div>
      <div className="font-semibold flex justify-center gap-2 text-center py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md">
        <span className="w-[10%]">Visitor ID</span>
        <span className="flex-1">User Agent</span>
        {/* <span>Language</span> */}
        <span className="w-[20%]">Platform</span>
        {/* <span>Screen Resolution</span> */}
        <span className="w-[10%]">Timezone</span>
        <span className="w-[10%]">Referrer</span>
        <span className="w-[10%]">Visit Date</span>
        {/* <th>Created At</th> */}
        {/* <th>Updated At</th> */}
      </div>
      {visitors?.map((visitor) => (
        <div
          key={visitor.id}
          className="text-center flex items-center gap-2 py-1 border-b-[1px] border-zinc-200 text-zinc-400 whitespace-break-spaces"
        >
          <span className="w-[10%]">{visitor.visitorId}</span>
          <span className="flex-1 ">{visitor.userAgent}</span>
          <div className="w-[20%] flex flex-col">
            <div>{visitor.language}</div>
            <div>{visitor.platform}</div>
            <div>{visitor.screenResolution}</div>
          </div>
          <span className="w-[10%]">{visitor.timezone}</span>
          <span className="w-[10%]">{visitor.referrer || "N/A"}</span>
          <span className="w-[10%]">
            {new Date(visitor.visitDate).toLocaleString()}
          </span>
          {/* <td>{new Date(visitor?.createdAt ?? 0).toLocaleString()}</td>
              <td>{new Date(visitor.updatedAt ?? 0).toLocaleString()}</td> */}
        </div>
      ))}
      <Pagination activePage={page} count={count} />
    </main>
  );
}
