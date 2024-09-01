import React from "react";
import DashboardSideBar from "@/components/admin/DashboardSideBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();

  const isAdmin = user ? user?.email === process.env?.ADMIN_EMAIL : false;

  if (!isAdmin) {
    redirect("/api/auth/login");
  }

  return (
    <>
      <div className="flex items-stretch flex-1">
        <DashboardSideBar />
        {children}
      </div>
    </>
  );
}
