import Catalog from "components/Catalog/Catalog";
import TextColophon from "components/Catalog/TextColophon";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const BaseCatalog = ({ title, rss, preamble, filters, items }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => (
        <TextColophon>#{items.length - items.indexOf(item)}</TextColophon>
      )}
      righthandComponent={(item) => (
        <div>
          <a href={item.url}>
            <div className="text-lg font-bold underline mb-2">{item.title}</div>
          </a>
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div>{new Date(item.date).toLocaleDateString("US")}</div>
        </div>
      )}
    />
  );
};

type Press = {
  id: string;
  title: string;
  description: any;
  date: number;
  url: string;
};

const Preamble = `
I have been fortunate enough to get to navelgaze, opine, and/or thought-lead on a number of podcasts.

Similarly, sometimes I or my projects are covered in the press. I find this less consequential but slightly more fun.
`;

const PressCatalog = ({ preamble, items }) => (
  <BaseCatalog
    title="Press"
    rss="/rss/press.xml"
    preamble={preamble}
    items={items}
    filters={[]}
  />
);

const mungeRecord = async (record: any): Promise<Press> => {
  return {
    id: record.id,
    description: record.fields.Definition
      ? await serialize(record.fields.Definition)
      : null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    title: record.fields.Name,
    url: record.fields.Permalink || null,
  };
};

export async function getServerSideProps() {
  const rawRecords = await await fetchAllRecords("Press");
  const items = await Promise.all(rawRecords.map(mungeRecord));
  return {
    props: {
      items: items.sort((a, b) => {
        return b.date - a.date;
      }),
      preamble: await compile(Preamble),
    },
  };
}

export default PressCatalog;
