"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "./zodSchemas";
import { BlogPost, Prisma } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { MetaData } from "../../types";
import { ITEMS_PER_PAGE } from "./data";
import { getBytes, ref } from "firebase/storage";
import { storage } from "./firebase";

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

export async function CreateBlogPost(document: MetaData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return redirect("/");

    console.log(document);

    const response = await prisma.blogPost.create({
      data: {
        title: document.title,
        slug: document.slug,
        summary: document.detail ?? "",

        category: document?.category ?? "",
        tags: document.tags ?? [],

        status:
          document.status === "Published"
            ? "PUBLISHED"
            : document.status === "Archived"
            ? "ARCHIVED"
            : "DRAFT",

        authorId: user.id,

        featured: false,
        pinned: document.pinned ?? false,

        sortIndex: document.sortIndex,
        banner: document.banner,

        downloadURL: document.downloadURL,
      },
    });
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
}

// TODO: REMOVE
// export async function MigratePost(document: MetaData) {
//   try {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();

//     if (!user) return redirect("/");

//     const createdAt = document.createdAt
//       ? new Date(
//           (document.createdAt.seconds ?? 0) * 1000 +
//             (document.createdAt.nanoseconds ?? 0) / 1000000
//         )
//       : new Date();

//     const publishedAt = document?.publishedAt
//       ? new Date(
//           (document.publishedAt.seconds ?? 0) * 1000 +
//             (document.publishedAt.nanoseconds ?? 0) / 1000000
//         )
//       : null;

//     console.log(document);

//     const response = await prisma.blogPost.create({
//       data: {
//         id: document.id,

//         title: document.title,
//         slug: document.slug,
//         summary: document.detail ?? "",

//         category: document?.category ?? "",
//         tags: document.tags ?? [],

//         status: document.status === "Published" ? "PUBLISHED" : "DRAFT",

//         authorId: user.id,

//         featured: false,
//         pinned: document.pinned ?? false,

//         sortIndex: parseInt(document.sortIndex?.toString() ?? "0"),
//         banner: document.banner,

//         downloadURL: document.downloadURL,

//         createdAt,
//         publishedAt,
//       },
//     });

//     revalidatePath("/admin/blogs");

//     return { status: "success" };
//   } catch (error) {
//     console.log(error);
//     return { status: "error" };
//   }
// }

export async function UpdateBlogPost(
  blogPost: BlogPost,
  publish?: boolean,
  archive?: boolean
) {
  try {
    const data: Partial<BlogPost> = {
      title: blogPost.title,
      slug: blogPost.slug,
      summary: blogPost.summary,

      category: blogPost.category,
      tags: blogPost.tags,

      featured: blogPost.featured,
      pinned: blogPost.pinned,

      sortIndex: blogPost.sortIndex,
      banner: blogPost.banner,
      thumbnail: blogPost.thumbnail,
    };

    if (publish === true) {
      data.status = "PUBLISHED";
      data.publishedAt = new Date();
    }
    if (archive === true) {
      data.status = "ARCHIVED";
      data.archivedAt = new Date();
    }

    const response = await prisma.blogPost.update({
      where: { id: blogPost.id },
      data,
    });

    revalidatePath("/admin/blogs");

    return { status: "success" };
  } catch (error) {
    return { status: "error" };
  }
}

type Filters = {
  status?: string;
};

export async function getBlogPosts({
  page,
  search,
  featured,
  status = "PUBLISHED",
}: {
  page: number;
  featured?: boolean;
  search?: string;
  status?: string;
}) {
  const query: Prisma.BlogPostWhereInput = {};

  if (status === "PUBLISHED") {
    query.status = "PUBLISHED";
  }
  if (status === "DRAFT") {
    query.status = "DRAFT";
  }
  if (search) {
    query.title = { contains: search, mode: "insensitive" };
  }
  if (featured === true) {
    query.pinned = true;
  }

  try {
    const data = await prisma.blogPost.findMany({
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.blogPost.count({
      where: query,
    });

    return { status: "success", data, count };
  } catch (error) {
    console.error(error);
    return { status: "error", data: [], count: 0 };
  }
}

export async function getPostbySlug(slug: string) {
  try {
    const metadata = await prisma.blogPost.findFirst({ where: { slug: slug } });

    // if (!metadata) throw new Error("Blog Post Not Found");

    const storageRef = ref(storage, `/blogs/${metadata?.id ?? ""}.mdx`);

    const file = await getBytes(storageRef);
    var enc = new TextDecoder("utf-8");
    const rawMDX = enc.decode(file);

    return { status: "success", metadata, rawMDX };
  } catch (error) {
    console.error(error);
    return { status: "error", metadata: null, rawMDX: null };
  }
}

export async function getRelatedPosts(slug: string) {
  try {
    const blogPost = await prisma.blogPost.findFirst({ where: { slug: slug } });

    const data = await prisma.blogPost.findMany({
      where: { category: blogPost?.category },
      take: 5,
    });

    return { status: "success", data };
  } catch (error) {
    console.error(error);
    return { status: "error", data: [] };
  }
}
