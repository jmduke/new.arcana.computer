import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const compile = async (text: string) =>
  await serialize(text, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

export default compile;
