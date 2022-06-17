import Catalog from "../../components/Catalog/IncrementingCatalog";
import { fetchAllRecords } from "lib/airtable";
import { Item } from "lib/data";
import { serialize } from "next-mdx-remote/serialize";
import { mungeRecord as mungeContentRecord } from "../../lib/content";
import remarkFootnotes from "remark-footnotes";

const Preamble = `
I collect quotes like trading cards. I don’t have a strong criteria for inclusion in this list: if the quote was remarkable in any way (a clever turn of phrase, an interesting concept, a pithy aphorism, a useful insight, a beautiful piece of diction) I’ll add it here. At some point I might try and make this entire enterprise a little more organize with tags and such, but that seems unnecessary while the number of quotes is still less than a thousand: it is hard to displace the ergonomics of Command & F.
`;

const QuotesCatalog = ({ preamble, items }) => (
  <Catalog
    title="Quotes and highlights"
    rss="/rss/quotes.xml"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

type Quote = {
  id: string;
  description: string;
  date: number;
  source:
    | {
        name: string;
        url: string;
      }
    | Item;
};

const mungeRecord = async (record: any, content: any[]): Promise<Quote> => {
  const sourceId = record.fields.Source ? record.fields.Source[0] : null;
  const source = sourceId
    ? content.filter((c) => c.id === sourceId)[0]
      ? await mungeContentRecord(content.filter((c) => c.id === sourceId)[0])
      : null
    : null;
  return {
    id: record.id,
    description: await serialize(record.fields.Text),
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    source: source || {
      name: record.fields.Author || null,
      url: record.fields["Source URL"] || null,
    },
  };
};

const filters = [
  {
    id: "all",
    label: "All quotes",
    filter: (i: Quote) => true,
  },
  {
    id: "books",
    label: "From books",
    filter: (i: Quote) => i.source && i.source.type === "Book",
  },
  {
    id: "tweets",
    label: "Tweets",
    filter: (i: Quote) => i.source_url && i.source_url.includes("twitter"),
  },
];

export async function getStaticProps() {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Notebook");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record, rawContent))
  );
  return {
    props: {
      items,
      preamble: await serialize(Preamble, {
        mdxOptions: {
          remarkPlugins: [remarkFootnotes],
          rehypePlugins: [],
          providerImportSource: "@mdx-js/react",
        },
      }),
    },
  };
}

export default QuotesCatalog;