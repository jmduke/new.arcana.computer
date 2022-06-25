import H1 from "components/Markdown/H1";
import H3 from "components/Markdown/H3";
import Tag from "components/Tag";
import { fetchAllRecords } from "lib/airtable";
import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import { fetch } from "lib/content";
import { Type } from "lib/data";
import { MDXRemote } from "next-mdx-remote";

const CatalogPage = ({ item, quotes }) => (
  <div>
    <div className="float-left mr-8 mb-2">
      <img
        src={item.image}
        alt={item.title}
        style={{ maxWidth: LEFTHAND_COLUMN_SIZE }}
        className="rounded-lg"
      />
    </div>
    <H1>{item.title}</H1>

    {item.author && item.year && (
      <div className="text-lg uppercase text-gray-600">
        {item.author} • {item.year}
      </div>
    )}
    <div className="my-4 text-lg">
      {item.description ? (
        <MDXRemote {...item.description} />
      ) : (
        <div>No writeup yet.</div>
      )}
    </div>
    <div className="my-4 text-gray-700 space-x-4 flex">
      <div className="flex-1">
        {item.rating}/10 •{" "}
        {item.date && new Date(item.date).toLocaleDateString()}
      </div>
      {item.genre && <Tag value={item.genre} />}
    </div>
    {quotes.length > 0 && (
      <div>
        <H3>Highlights</H3>
        <div className="space-y-8">
          {quotes.map((quote, i) => (
            <div key={i} className="text-lg">
              <span className="bg-yellow-100">{quote}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const TYPE_SLUG_TO_CONTENT_TYPE: { [key: string]: Type } = {
  books: "Book",
  games: "Game",
  movies: "Movie",
  music: "Album",
};

export async function getStaticProps({ params }) {
  const items = await fetch(TYPE_SLUG_TO_CONTENT_TYPE[params.type]);
  const quotes = await fetchAllRecords("Notebook");
  const item = items.filter((i) => i.slug === params.slug)[0];
  const relevantQuotes = quotes
    .filter((q) => (q.fields.Source ? q.fields.Source[0] == item.id : false))
    .map((q) => q.fields.Text);
  return {
    props: {
      item,
      quotes: relevantQuotes,
    },
  };
}

export async function getStaticPaths() {
  const paths: string[] = (
    await Promise.all(
      Object.entries(TYPE_SLUG_TO_CONTENT_TYPE).map(
        async ([type, contentType]) => {
          const items = await fetch(contentType);
          return items
            .filter((i) => i.slug !== "")
            .map((item) => `/catalogs/${type}/${item.slug}`);
        }
      )
    )
  ).flat();
  return {
    paths,
    fallback: false,
  };
}

export default CatalogPage;
