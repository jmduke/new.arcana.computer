import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

import serialize from "./compile";

const CONTENT_DIRECTORY = path.join(process.cwd(), "pages/catalogs/content");
const QUOTES_DIRECTORY = path.join(process.cwd(), "pages/catalogs/notebook");

export const fetchAll = async () => {
  const fileNames = fs.readdirSync(CONTENT_DIRECTORY);
  return await Promise.all(
    fileNames
      .filter((filename) => filename.endsWith("mdx"))
      .map(async function (fileName) {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(CONTENT_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          id,
          title: matterResult.data.title,
          slug: id,
          status: matterResult.data.status || "",
          image: matterResult.data.image || "",
          catalog:
            {
              Book: "books",
              Movie: "movies",
            }[matterResult.data.type] || "content",
          rating: matterResult.data.rating || "",
          date: matterResult.data.date ? matterResult.data.date.toString() : "",
          description: await serialize(matterResult.content),
          htmlDescription: marked.parse(matterResult.content),
          type: matterResult.data.type || "",
          source: matterResult.data.content || matterResult.data.source || "",
        };
      })
  );
};

export const fetchAllQuotes = async (backingContent: any[]) => {
  const fileNames = fs.readdirSync(QUOTES_DIRECTORY);

  const titleToContent = backingContent.reduce((acc, item) => {
    acc[item.title] = item;
    return acc;
  }, {});

  return await Promise.all(
    fileNames
      .filter((filename) => filename.endsWith("mdx"))
      .map(async function (fileName) {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(QUOTES_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        const backingContentForSource = matterResult.data.source
          ? titleToContent[matterResult.data.source] || null
          : null;

        return {
          id,
          date: matterResult.data.date
            ? matterResult.data.date.toString()
            : id.replace(".mdx", ""),
          content: matterResult.content || "",
          description: await serialize(matterResult.content),
          author: matterResult.data.author || "",
          source: backingContentForSource || {
            name: matterResult.data.source || matterResult.data.author || "",
          },
        };
      })
  );
};

const DIRECTORY = path.join(process.cwd(), "pages/blog/posts");
export const fetchAllPosts = async () => {
  const fileNames = fs.readdirSync(DIRECTORY);
  const items = await Promise.all(
    fileNames
      .filter((filename) => filename.endsWith("mdx"))
      .map(async function (fileName) {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
          id,
          slug: id,
          title: matterResult.data.title,
          date: matterResult.data.date.toString(),
          description: await serialize(matterResult.content),
          htmlDescription: marked.parse(matterResult.content),
        };
      })
  );
  return items.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
};
