import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const compile = async (text: string) =>
  await serialize(text.replace(/\[\[/g, "~~").replace(/\]\]/g, "~~"), {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

export default compile;
