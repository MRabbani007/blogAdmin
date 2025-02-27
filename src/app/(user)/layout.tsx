import SideBar from "@/components/layout/SideBar";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-stretch flex-1 bg-stone-400/50 dark:bg-stone-900">
      {children}
      <SideBar />
    </div>
  );
}
