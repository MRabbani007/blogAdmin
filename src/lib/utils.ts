import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Doc } from "../../types";

// {
//   title?: string;
//   slug?: string;
//   publishedAt?: string;
//   tags?: string[];
// }

export const extractMdx = async (rawMDX: string) => {
  const { frontmatter, content } = await compileMDX<Partial<Doc>>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  return { frontmatter, content };
};

export const compileFrontmatter = (doc: Partial<Doc>) => {
  // const frontMatter = `---${JSON.stringify(doc)
  //   .replaceAll('"', "")
  //   .replace("{", "")
  //   .replace("}", "")}---`;

  const temp = `---\ntitle: ${doc.title}\nslug: ${doc.slug}\ncategory: ${doc.category}\n---`;

  return temp;
};
