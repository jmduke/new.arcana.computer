import type { Item, Type } from "./data";
import { serialize } from "next-mdx-remote/serialize";
import { fetchAllRecords } from "./airtable";
import { marked } from "marked";

function slugify(text) {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

const mungeRecord = async (record: any): Promise<Item> => {
  return {
    id: record.id,
    slug: slugify(record.fields.Name),
    title: record.fields.Name,
    type: record.fields.Type || null,
    author: record.fields.Author || null,
    rating: record.fields.Rating || null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    description: (await serialize(record.fields.Summary)) || null,
    htmlDescription: record.fields.Summary
      ? marked.parse(record.fields.Summary)
      : "",
    year: record.fields.Year || null,
    genre: record.fields.Genre ? record.fields.Genre[0] : null,
    image: record.fields.Image ? record.fields.Image[0].url : null,
  };
};

const fetch = async (type: Type): Promise<Item[]> => {
  const records = await fetchAllRecords("Content");
  const items = await Promise.all(
    records.map(async (record) => mungeRecord(record))
  );
  return items
    .filter((item) => item.type === type)
    .sort(function (a, b) {
      return b.date - a.date;
    });
};

export { fetch, mungeRecord };
