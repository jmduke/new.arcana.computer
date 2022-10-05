import { Item } from "lib/data";

import Catalog from "../../components/Catalog/ContentCatalog";
import { getStaticPropsFactory } from "../../components/Catalog/lib";
import Icon from "../../components/Icon";

const filters = [
  {
    id: "all",
    label: "All books",
    filter: (i: Item) => i.status === "Finished",
    icon: <Icon.Collection />,
  },
  {
    id: "favorites",
    label: "Favorite books",
    filter: (i: Item) => i.rating > 8,
    icon: <Icon.Star />,
  },
  {
    id: "poetry",
    label: "Poetry",
    filter: (i: Item) => i.genre === "Poetry",
    icon: <Icon.PencilAlt />,
  },
  {
    id: "abandoned",
    label: "Abandoned books",
    filter: (i: Item) => i.status === "Abandoned",
    icon: <Icon.Trash />,
  },
  {
    id: "shelved",
    label: "Shelved books",
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
I love to read!

This is a list of every book I’ve read since I’ve started tracking that
sort of thing. I also have a rough rating system of how good I think a
book is. “Good” is relative and intentionally squishy; I want the rating
to be indicative of two things:

- How important is this book to me?
- How strongly would I recommend it to someone?

Additionally, since late 2019 I’ve been trying to write up my thoughts on
books after I complete them, as an exercise in switching from consumptive
energies to productive ones. This is an exercise for whom I give Tom
MacWright lots of credit: I’d been collecting this information for a while
now, but hadn’t done anything interesting with surfacing or externalizing
it.

(Also, be warned: my writeups will probably contain spoilers.)
`;

const BookCatalog = ({ preamble, items }) => (
  <Catalog
    title="Books"
    rss="/rss/books.xml"
    name="books"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

const getServerSideProps = getStaticPropsFactory(Preamble, "Book", "books");
export { getServerSideProps };

export default BookCatalog;
