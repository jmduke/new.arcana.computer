import { Feed } from "feed";
import fs from "fs";
import { SITE_URL } from "lib/constants";

const AUTHOR = {
  name: "Justin Duke",
  email: "me@jmduke.com",
  link: "https://twitter.com/jmduke",
};

export type RSSItem = {
  title: string;
  html: string;
  url: string;
  date: Date;
  category: string;
};

export const generate = async (items: RSSItem[], name: string) => {
  const date = new Date();
  const feed = new Feed({
    title: `${name} · arcana.computer`,
    description: `Justin Duke's ${name} catalog`,
    id: SITE_URL,
    link: SITE_URL,
    favicon: `${SITE_URL}/favicon.ico`,
    updated: date,
    generator: "Feed for node.js",
    copyright: "2023 Justin Duke",
    author: AUTHOR,
    feedLinks: {
      rss2: `${SITE_URL}/rss/${name}.xml`,
    },
  });
  items.map((item) => {
    feed.addItem({
      title: item.title || "",
      id: item.url,
      link: item.url,
      description: item.html || "",
      content: item.html,
      author: [AUTHOR],
      contributor: [AUTHOR],
      date: item.date,
      category: [
        {
          name: item.category,
        },
      ],
    });
  });
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync(`./public/rss/${name}.xml`, feed.rss2());
};
