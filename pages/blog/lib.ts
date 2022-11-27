import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

const DIRECTORY = path.join(process.cwd(), "pages/blog/posts");
export const getItems = async () => {
  const fileNames = fs.readdirSync(DIRECTORY);
  return await Promise.all(
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
          title: matterResult.data.title,
          date: matterResult.data.date.toString(),
          description: await serialize(matterResult.content),
          htmlDescription: marked.parse(matterResult.content),
        };
      })
  );
};
