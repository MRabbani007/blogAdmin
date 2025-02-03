import { getAllVisitors } from "@/lib/statistics";

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

export default async function VisitorsDisplay() {
  const response = await getAllVisitors();

  if (response?.success !== true) {
    return <p>Failed to fetch visitors data</p>;
  }

  const visitors = response?.data;

  if (visitors?.length === 0) {
    return <div>No visitors found.</div>;
  }

  return (
    <div>
      <div className="font-semibold flex justify-center gap-2 text-center py-2 bg-zinc-200 rounded-md">
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
          className="text-center flex items-center gap-2 py-1  border-b-[1px] border-zinc-200"
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
    </div>
  );
}
