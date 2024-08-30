"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "./zodSchemas";

export async function CreateSiteAction(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, { schema: siteSchema });

  if (submission.status !== "success") {
    return submission.reply;
  }
}

export async function CreateBlog(prevState: any, formData: FormData) {}
