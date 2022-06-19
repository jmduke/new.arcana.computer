import { Feed } from "feed";
import { Item } from "lib/data";
import fs from "fs";

const SITE_URL = "https://arcana.computer";
const AUTHOR = {
  name: "Justin Duke",
  email: "me@jmduke.com",
  link: "https://twitter.com/jmduke",
};

export const generate = async (items: Item[], name: string) => {
  const date = new Date();
  const feed = new Feed({
    title: `${name} · arcana.computer`,
    description: `Justin Duke's ${name} catalog`,
    id: SITE_URL,
    link: SITE_URL,
    favicon: `${SITE_URL}/favicon.ico`,
    updated: date,
    generator: "Feed for node.js",
    copyright: "2022 Justin Duke",
    author: AUTHOR,
    feedLinks: {
      rss2: `${SITE_URL}/rss/${name}.xml`,
    },
  });
  items.map((item) => {
    const url = `${SITE_URL}/catalogs/${name}`;
    feed.addItem({
      title: item.title || "",
      id: url,
      link: url,
      description: item.htmlDescription || "",
      content: item.htmlDescription || "",
      author: [AUTHOR],
      contributor: [AUTHOR],
      date: item.date ? new Date(item.date) : new Date(),
    });
  });
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync(`./public/rss/${name}.xml`, feed.rss2());
};
