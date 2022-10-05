import { Item } from "lib/data";

import Catalog from "../../components/Catalog/ContentCatalog";
import { getStaticPropsFactory } from "../../components/Catalog/lib";
import Icon from "../../components/Icon";

const filters = [
  {
    id: "all",
    label: "All music",
    filter: (i: Item) => true,
    icon: <Icon.Collection />,
  },
  {
    id: "favorites",
    label: "Favorite music",
    filter: (i: Item) => i.rating > 8,
    icon: <Icon.Star />,
  },
];

const Preamble = `
This is a relatively new catalog that I started in late 2020 (with _some_ backdating)
as a bit of a forcing function to listen to more new music and not just constantly listen
to a rotation of the same power pop [^1] and lo-fi that I always do.

It is bare-bones (in terms of content & metadata) at the moment, but I hope to have some more
interesting pieces in the next few months!

[^1]: give carly rae jepsen a sword
`;

const MusicCatalog = ({ preamble, items }) => (
  <Catalog
    title="Music"
    rss="/rss/music.xml"
    name="music"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

const getServerSideProps = getStaticPropsFactory(Preamble, "Album", "music");
export { getServerSideProps };

export default MusicCatalog;
