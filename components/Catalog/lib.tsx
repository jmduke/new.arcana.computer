import { Type } from "../../lib/data";
import remarkGfm from "remark-gfm";

import { serialize } from "next-mdx-remote/serialize";
import { fetch } from "../../lib/content";
import { generate as generateRSS } from "./rss";

export const compile = async (text: string) =>
  await serialize(text, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

const getStaticPropsFactory = (preamble: string, type: Type, path: string) => {
  async function getStaticProps() {
    const items = await fetch(type);
    await generateRSS(items, path);
    return {
      props: {
        items,
        preamble: await compile(preamble),
      },
    };
  }
  return getStaticProps;
};

export { getStaticPropsFactory };
