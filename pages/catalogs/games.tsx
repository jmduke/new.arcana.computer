import Catalog from "../../components/Catalog/ContentCatalog";
import { getStaticPropsFactory } from "../../components/Catalog/lib";
import { Item } from "lib/data";

const filters = [
  {
    id: "all",
    label: "All games",
    filter: (i: Item) => true,
  },
  {
    id: "favorites",
    label: "Favorite games",
    filter: (i: Item) => i.rating > 8,
  },
];

const Preamble = `
I like to play video games!

As you'll probably realize quickly, I'm a sucker for JRPGs and the RPG genre in general,
but even within those confines I'm fairly normcore (lots of Final Fantasy, Fire Emblem,
and Pokemon — though maybe describing my RPG tastes as normcore is showing that I care
too much about the niche.)

(Also, be warned: **my writeups will probably contain spoilers.**)`;

const GamesCatalog = ({ preamble, items }) => (
  <Catalog
    title="Games"
    rss="/rss/games.xml"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

const getStaticProps = getStaticPropsFactory(Preamble, "Game", "games");
export { getStaticProps };

export default GamesCatalog;
