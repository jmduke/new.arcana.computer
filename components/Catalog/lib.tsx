import compile from "lib/compile";

import { fetch } from "../../lib/content";
import { Type } from "../../lib/data";
import { generate as generateRSS } from "./rss";

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
