"use server";

import prisma from "./db";

interface VisitorInfo {
  visitorId: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  referrer?: string;
  visitDate: string;
}

export async function recordVisitor(visitorInfo: VisitorInfo) {
  try {
    const {
      visitorId,
      userAgent,
      language,
      platform,
      screenResolution,
      timezone,
      referrer,
      visitDate,
    } = visitorInfo;

    // Save the visit information to the database
    await prisma.visitor.create({
      data: {
        visitorId,
        userAgent,
        language,
        platform,
        screenResolution,
        timezone,
        referrer,
        visitDate: new Date(visitDate),
      },
    });

    return { success: true, message: "Visitor recorded successfully" };
  } catch (error) {
    console.error("Error saving visitor:", error);
    return { success: false, message: "Failed to record visitor" };
  }
}

export async function getAllVisitors() {
  try {
    const data = await prisma.visitor.findMany();

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return { success: false, message: "Failed to fetch visitor data" };
  }
}

export async function getVisitorbyId(visitorId: string) {
  try {
    const visitor = await prisma.visitor.findMany({
      where: { visitorId },
    });

    if (!visitor) {
      return { success: false, message: "Visitor not found" };
    }

    return { success: true, data: visitor };
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return { success: false, message: "Failed to fetch visitor data" };
  }
}
