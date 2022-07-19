import { Item } from "lib/data";

import Catalog from "../../components/Catalog/ContentCatalog";
import { getStaticPropsFactory } from "../../components/Catalog/lib";
import Icon from "../../components/Icon";

const filters = [
  {
    id: "all",
    label: "All television",
    filter: (i: Item) => i.status === "Finished",
    icon: <Icon.Collection />,
  },
  {
    id: "favorites",
    label: "Favorite television",
    filter: (i: Item) => i.rating > 8,
    icon: <Icon.Star />,
  },
  {
    id: "abandoned",
    label: "Abandoned shows",
    filter: (i: Item) => i.status === "Abandoned",
    icon: <Icon.Trash />,
  },
  {
    id: "shelved",
    label: "Shelved shows",
    filter: (i: Item) => i.status === "Shelved",
    icon: <Icon.BookmarkAlt />,
  },
  {
    id: "antilibrary",
    label: "Antilibrary",
    filter: (i: Item) => i.status === "",
    icon: <Icon.Document />,
  },
];

const Preamble = `
I used to be a much bigger TV buff than I am now, but I still catch a few shows every now and then.`;

const TelevisionCatalog = ({ preamble, items }) => (
  <Catalog
    title="Television"
    rss="/rss/television.xml"
    name="television"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

const getStaticProps = getStaticPropsFactory(
  Preamble,
  "Television",
  "television"
);
export { getStaticProps };

export default TelevisionCatalog;
