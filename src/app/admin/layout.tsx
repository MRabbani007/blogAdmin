import SideBar from "@/components/SideBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { getUser, isAuthenticated } = getKindeServerSession();

  // const user = await getUser();
  // const isUserAuthenticated = await isAuthenticated();

  // const isAdmin = user?.email === process.env?.ADMIN_EMAIL;

  // if (!isAdmin) {
  //   redirect("/api/auth/login");
  // }

  return (
    <>
      <div className="flex items-stretch flex-1">
        <SideBar />
        {children}
      </div>
    </>
  );
}
