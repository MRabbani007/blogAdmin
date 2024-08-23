"use client";

import React, { useState } from "react";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { RiBarChartHorizontalLine } from "react-icons/ri";

export default function AdminHeader() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  return (
    <header className="w-full h-20 bg-zinc-950 flex items-center gap-4 px-4">
      <div className="font-extrabold text-2xl">Admin</div>
      <div className="p-2 bg-zinc-800 rounded-full">
        <RiBarChartHorizontalLine size={24} />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={toggleFullScreen}
          className="p-2 bg-zinc-800 rounded-full"
        >
          {isFullScreen ? (
            <GoScreenFull size={24} />
          ) : (
            <GoScreenNormal size={24} />
          )}
        </button>
      </div>
    </header>
  );
}
