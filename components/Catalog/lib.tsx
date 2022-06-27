import compile from "lib/compile";
import { SITE_URL } from "lib/constants";

import { fetch } from "../../lib/content";
import { Type } from "../../lib/data";
import { generate as generateRSS } from "./rss";

const getStaticPropsFactory = (preamble: string, type: Type, path: string) => {
  async function getStaticProps() {
    const items = await fetch(type);
    await generateRSS(
      items.map((i) => {
        return {
          title: i.title,
          date: new Date(i.date),
          html: i.htmlDescription,
          url: `${SITE_URL}/catalogs/${path}/${i.slug}`,
        };
      }),
      path
    );
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
