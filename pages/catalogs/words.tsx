import Catalog from "../../components/Catalog/IncrementingCatalog";
import { fetchAllRecords } from "lib/airtable";
import { Item } from "lib/data";
import { serialize } from "next-mdx-remote/serialize";
import { mungeRecord as mungeContentRecord } from "../../lib/content";
import remarkFootnotes from "remark-footnotes";

type Word = {
  id: string;
  title: string;
  description: string;
  date: number;
  source:
    | {
        name: string;
        url: string;
      }
    | Item;
};

const Preamble = `
When I was in high school and even more insufferable than I am now, a friend and I started a tumblr called "sun words".  The concept of this was to collect words that we discovered that were particularly succulent or mellifluous. [^1]

I have found myself learning more and more words recently.  This is fun and good: I was worried for a while that my days of adapting and playing with the English language were largely behind me.  I thought it would be interesting and illustrative to collect a list of the words I've learned recently alongside the sources from which I've gleaned them.

When I first started building this catalog, I expected the plurality to be from the NYT crossword [^2], and the data appears to bear that out:

[^1]: Why "sun words"? Because we were high schoolers, and because we learned of the concept of "SAT words" — words that made Flesch-Kincaid salivate — and because _Sun_day comes after _Sat_urday.  (I told you — insufferable.)
[^2]: Of which I recommend you make a daily habit!
`;

const WordsCatalog = ({ preamble, items }) => (
  <Catalog
    title="Words"
    rss="/rss/words.xml"
    preamble={preamble}
    items={items}
    filters={[]}
  />
);

const mungeRecord = async (record: any, content: any[]): Promise<Word> => {
  const sourceId = record.fields.Content ? record.fields.Content[0] : null;
  const source = sourceId
    ? content.filter((c) => c.id === sourceId)[0]
      ? await mungeContentRecord(content.filter((c) => c.id === sourceId)[0])
      : null
    : null;
  return {
    id: record.id,
    description: record.fields.Definition
      ? await serialize(record.fields.Definition)
      : null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    title: record.fields.Name,
    source: source || {
      name: record.fields.Source || null,
      url: null,
    },
  };
};

export async function getStaticProps() {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Dictionary");
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

export default WordsCatalog;
