"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPostcard } from "react-icons/bs";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate, MdOutlinePending } from "react-icons/md";

const items = [
  { label: "Dashboard", url: "/admin", icon: <IoHome size={30} /> },
  { label: "Blogs", url: "/admin/blogs", icon: <BsPostcard size={30} /> },
  {
    label: "Add Blog",
    url: "/admin/create",
    icon: <MdOutlineAddPhotoAlternate size={30} />,
  },
  {
    label: "Pending",
    url: "/admin/draft",
    icon: <MdOutlinePending size={30} />,
  },
  {
    label: "Settings",
    url: "/admin/settings",
    icon: <IoSettingsOutline size={30} />,
  },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  const isActive = (path: string) => (pathname === path ? true : false);

  return (
    <nav className="">
      <ul>
        {items.map((item, index) => (
          <Link href={item?.url} key={index}>
            <li
              className={
                (isActive(item.url) ? "bg-purple-700" : "") +
                " flex flex-col gap-2 items-center justify-center p-4 duration-200"
              }
            >
              {item?.icon}
              {/* <span>{item?.label}</span> */}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
