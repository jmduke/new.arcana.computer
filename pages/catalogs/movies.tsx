import Catalog from "../../components/Catalog/ContentCatalog";
import { getStaticPropsFactory } from "../../components/Catalog/lib";
import { Item } from "lib/data";

const filters = [
  {
    id: "all",
    label: "All movies",
    filter: (i: Item) => true,
  },
  {
    id: "favorites",
    label: "Favorite movies",
    filter: (i: Item) => i.rating > 8,
  },
];

const Preamble = `
I am not a movie buff, but, uh, here you go. I think I _want_ to be a film person more than I currently am; I certainly
have outgrown my television phase [^1] but I don't make a particularly strong habit of watching movies.

There is one exception to this, which is that almost every Sunday night for the past year my partner and I have watched a movie together. These come in phases — we had our Miyazaki phase, our pre-code screwball phase, and our Harry Potter phase — but it's been a really nice tradition.

If you're doing a similar thing with your movie reviews, please let me know! The only person I know of doing this is my friend [Oliver](http://oliverzheng.com/reviews/) [^2] and I _really_ don't want to have to go through the whole process of creating a [Letterboxd](https://letterboxd.com/) account. [^3]

[^1]: You could find me in the 2012 A.V. Club comment section, vigorously debating the finer points of Mad Men.
[^2]: Though at the time of writing this, he has only reviewed one movie. Come on, Oliver!
[^3]: This isn't meant to denigrate Letterboxd, which frankly strikes me as the best "content cataloging" service that I've ever seen. I just don't want yet another account inevitably designed to the dustbin of history.
`;

const MovieCatalog = ({ preamble, items }) => (
  <Catalog
    title="Movies"
    rss="/rss/movies.xml"
    preamble={preamble}
    items={items}
    filters={filters}
  />
);

const getStaticProps = getStaticPropsFactory(Preamble, "Movie");
export { getStaticProps };

export default MovieCatalog;
