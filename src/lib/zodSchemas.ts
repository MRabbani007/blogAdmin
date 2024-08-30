import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(150),
  subdirectory: z.string().min(1).max(40),
});

export const blogSchema = z.object({
  title: z.string().min(1).max(50),
  slug: z.string(),
  detail: z.string().min(1).max(150),
  category: z.string(),

  sortIndex: z.number(),
});
