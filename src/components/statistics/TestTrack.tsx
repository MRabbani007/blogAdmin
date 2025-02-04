"use client";

import React, { useEffect } from "react";

export default function TestTrack() {
  const temp = { latitude: 0, longitude: 0 };

  //   useEffect(() => {
  //     // 🌍 Try to get precise geolocation
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           temp.latitude = position.coords.latitude;
  //           temp.longitude = position.coords.longitude;
  //         },
  //         (error) => {
  //           console.warn("Geolocation permission denied:", error);
  //         }
  //       );
  //     }
  //   }, []);

  return (
    <div>
      <p>{temp.longitude}</p>
      <p>{temp.latitude}</p>
    </div>
  );
}
