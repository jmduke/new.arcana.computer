import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

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
          date: matterResult.data.date
            ? matterResult.data.date.toString()
            : id.replace(".mdx", ""),
          description: await serialize(matterResult.content),
          type: matterResult.data.type || "",
          source: matterResult.data.content || matterResult.data.source || "",
        };
      })
  );
};

export const fetchAllQuotes = async () => {
  const fileNames = fs.readdirSync(QUOTES_DIRECTORY);
  return await Promise.all(
    fileNames
      .filter((filename) => filename.endsWith("mdx"))
      .map(async function (fileName) {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(QUOTES_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          id,
          date: matterResult.data.date
            ? matterResult.data.date.toString()
            : id.replace(".mdx", ""),
          content: matterResult.content || "",
          description: await serialize(matterResult.content),
          author: matterResult.data.author || "",
          source: matterResult.data.content || matterResult.data.source || "",
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
