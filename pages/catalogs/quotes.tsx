import Catalog from "components/Catalog/MiscellanyCatalog";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import { munge, Quote } from "lib/quotes";

import Icon from "../../components/Icon";

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
    name="quotes"
  />
);

const filters = [
  {
    id: "all",
    label: "All quotes",
    filter: (i: Quote) => true,
    icon: <Icon.Collection />,
  },
  {
    id: "books",
    label: "From books",
    filter: (i: Quote) => {
      if (!i.source) {
        return false;
      }
      if (!("type" in i.source)) {
        return false;
      }
      return i.source.type === "Book";
    },
    icon: <Icon.Book />,
  },
  {
    id: "tweets",
    label: "Tweets",
    filter: (i: Quote) => {
      if (!i.source) {
        return false;
      }
      if (!("url" in i.source)) {
        return false;
      }
      return i.source.url && i.source.url.includes("twitter");
    },
    icon: <Icon.Annotation />,
  },
];

export async function getServerSideProps() {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Notebook");
  console.log("Started");
  const items = await Promise.all(
    rawRecords.map(async (record) => munge(record, rawContent))
  );
  console.log("Finished");
  return {
    props: {
      items,
      preamble: await compile(Preamble),
    },
  };
}

export default QuotesCatalog;
