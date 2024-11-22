import { BlogPost } from "@prisma/client";

export const POST_TEMPLATE: BlogPost = {
  id: "",

  title: "",
  slug: "",
  summary: "",

  category: "",
  tags: [],

  featured: false,
  pinned: false,
  status: "DRAFT",

  banner: "",
  thumbnail: "",

  viewsCount: 0,
  likesCount: 0,
  commentsCount: 0,

  authorId: "",

  sortIndex: 0,

  filename: "id" + ".mdx",
  pathname: "/blogs/" + "id" + ".mdx",
  downloadURL: "",

  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: null,
  archivedAt: null,
};
