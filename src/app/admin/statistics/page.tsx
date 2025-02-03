import VisitorsDisplay from "@/components/statistics/VisitorsDisplay";
import React from "react";

export default function StatisticsPage() {
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
      <VisitorsDisplay />
    </main>
  );
}
