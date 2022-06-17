import { Type } from "../../lib/data";
import remarkFootnotes from "remark-footnotes";

import { serialize } from "next-mdx-remote/serialize";
import { fetch } from "../../lib/content";

const getStaticPropsFactory = (preamble: string, type: Type) => {
  async function getStaticProps() {
    return {
      props: {
        items: await fetch(type),
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
