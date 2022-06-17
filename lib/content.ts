import type { Item, Type } from "./data";
import { serialize } from "next-mdx-remote/serialize";
import { fetchAllRecords } from "./airtable";

const mungeRecord = async (record: any): Promise<Item> => {
  return {
    id: record.id,
    title: record.fields.Name,
    type: record.fields.Type || null,
    author: record.fields.Author || null,
    rating: record.fields.Rating || null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    description: (await serialize(record.fields.Summary)) || null,
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
