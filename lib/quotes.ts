import compile from "./compile";
import { mungeRecord as mungeContentRecord } from "./content";
import { Item } from "./data";

export type Quote = {
  id: string;
  description: any;
  date: number;
  name: string;
  source:
    | {
        name: string;
        url: string;
      }
    | Item;
};

export const munge = async (record: any, content: any[]): Promise<Quote> => {
  const sourceId = record.fields.Source ? record.fields.Source[0] : null;
  const source = sourceId
    ? content.filter((c) => c.id === sourceId)[0]
      ? await mungeContentRecord(content.filter((c) => c.id === sourceId)[0])
      : null
    : null;
  return {
    id: record.id,
    description: await compile(record.fields.Text),
    name: record.fields.Name,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    source: source || {
      name: record.fields.Author || null,
      url: record.fields["Source URL"] || null,
    },
  };
};
