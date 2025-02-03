"use client";
import { recordVisitor } from "@/lib/statistics";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TrackVisitor() {
  useEffect(() => {
    const trackVisit = async () => {
      let visitorId = localStorage.getItem("visitorId");
      if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem("visitorId", visitorId);
      }

      const visitorInfo = {
        visitorId,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        visitDate: new Date().toISOString(),
      };

      await recordVisitor(visitorInfo);
    };

    trackVisit();
  }, []);

  return null; // This component doesn't render anything
}
