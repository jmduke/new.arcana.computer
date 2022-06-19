import { Type } from "../../lib/data";
import remarkFootnotes from "remark-footnotes";

import { serialize } from "next-mdx-remote/serialize";
import { fetch } from "../../lib/content";
import { generate as generateRSS } from "./rss";

const getStaticPropsFactory = (preamble: string, type: Type, path: string) => {
  async function getStaticProps() {
    const items = await fetch(type);
    await generateRSS(items, path);
    return {
      props: {
        items,
        preamble: await serialize(preamble, {
          mdxOptions: {
            remarkPlugins: [remarkFootnotes],
            rehypePlugins: [],
          },
        }),
      },
    };
  }
  return getStaticProps;
};

export { getStaticPropsFactory };
