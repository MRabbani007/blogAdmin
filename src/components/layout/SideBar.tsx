import React from "react";
import SideBarCategories from "../SideBarCategories";
import PopularPosts from "../PopularPosts";
import SideBarTags from "../SideBarTags";

export default function SideBar() {
  return (
    <div className="max-w-[400px] flex-1 space-y-4 p-4">
      <SideBarCategories />
      <PopularPosts />
      <SideBarTags />
    </div>
  );
}
