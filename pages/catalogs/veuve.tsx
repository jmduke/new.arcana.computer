import Catalog from "components/Catalog/Catalog";
import TextColophon from "components/Catalog/TextColophon";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import { MDXRemote } from "next-mdx-remote";

const BaseCatalog = ({ title, rss, preamble, filters, items }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => (
        <TextColophon>🍾 #{items.indexOf(item)}</TextColophon>
      )}
      righthandComponent={(item) => (
        <div>
          <div className="text-lg font-bold">
            {new Date(item.date).toLocaleDateString("US")}
          </div>
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
        </div>
      )}
    />
  );
};

type Entry = {
  id: string;
  description: any;
  date: number;
};

const Preamble = `
> I wouldn’t take the time to celebrate the achievement.
> I’m an achiever by nature, the kind who feels like every day starts at zero.
> Not deliberately marking these moments left me feeling like I wasn’t actually accomplishing anything.
>  “Oh cool, that A List Apart article went up,” I would think, then move on with my day.
>  — [Lara Hogan](https://larahogan.me/donuts/)

I struggle with commemorating accomplishments.

The hedonic treadmill of modernity makes it difficult for me to sit back, look at my current state of affairs, and think ”ah, yes, this is good, I have reached Accomplishment”. Every MRR milestone is the beginning of a new target; every promotion is the introduction of a new ladder. You buy a house and then you think about buying a larger house. [^1]

I am bad at this on a small scale: there are lots of little victories on a weekly basis that I don’t properly cherish. Inbox zero is the moment before a cluttered inbox, a new customer is a churn risk waiting to happen, and all that.

But my partner and I have made a deal with each other, which is to celebrate things we’re particularly proud of with a bottle of Veuve Clicquot.

Veuve is a very nice champagne. It is expensive, but not break-the-bank: at roughly $40 for a bottle, its cheaper (and more sweatpants-friendly) than two pairs of drinks out at a cocktail bar.

Here are the times that we’ve bought bottles of Veuve!
`;

const VeuveCatalog = ({ preamble, items }) => (
  <BaseCatalog
    title="Bottles of Veuve Clicquot"
    rss="/rss/veuve.xml"
    preamble={preamble}
    items={items}
    filters={[]}
  />
);

const mungeRecord = async (record: any): Promise<Entry> => {
  return {
    id: record.id,
    description: record.fields.Definition
      ? await compile(record.fields.Definition)
      : null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
  };
};

export async function getServerSideProps() {
  const rawRecords = await fetchAllRecords("Veuve");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record))
  );
  return {
    props: {
      items,
      preamble: await compile(Preamble),
    },
  };
}

export default VeuveCatalog;
