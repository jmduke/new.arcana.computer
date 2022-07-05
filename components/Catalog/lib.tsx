import compile from "lib/compile";
import { SITE_URL } from "lib/constants";
import { generate as generateRSS, RSSItem } from "lib/rss";

import { fetch } from "../../lib/content";
import { CONTENT_TYPE_TO_TYPE_SLUG, Item, Type } from "../../lib/data";

export const convertItemToRSS = (i: Item): RSSItem => {
  const catalogSlug = CONTENT_TYPE_TO_TYPE_SLUG[i.type];
  return {
    title: i.title,
    date: new Date(i.date),
    html: i.htmlDescription,
    url: `${SITE_URL}/catalogs/${catalogSlug}/${i.slug}`,
  };
};

const getStaticPropsFactory = (preamble: string, type: Type, path: string) => {
  async function getStaticProps() {
    const items = await fetch(type);
    await generateRSS(items.map(convertItemToRSS), path);
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
