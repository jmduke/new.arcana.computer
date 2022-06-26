import ImageColophon from "components/Catalog/SourceImage";
import H1 from "components/Markdown/H1";
import H3 from "components/Markdown/H3";
import SubscribeForm from "components/SubscribeForm";
import Tag from "components/Tag";
import { fetchAllRecords } from "lib/airtable";
import { fetch } from "lib/content";
import { Type } from "lib/data";
import { MDXRemote } from "next-mdx-remote";
import Head from "node_modules/next/head";

const CatalogPage = ({ item, quotes }) => (
  <div>
    <Head>
      <title>{item.title}</title>
    </Head>
    <div className="float-left mr-8 mb-2">
      <ImageColophon image={item.image} />
    </div>
    <H1>{item.title}</H1>

    {item.author && item.year && (
      <div className="text-lg uppercase text-gray-600">
        {item.author} • {item.year}
      </div>
    )}
    <div className="my-4">{item.genre && <Tag value={item.genre} />}</div>
    <div className="my-4 text-lg">
      {item.description ? (
        <MDXRemote {...item.description} />
      ) : (
        <div>No writeup yet.</div>
      )}
    </div>
    <div className="my-4 text-gray-700 space-x-4 flex">
      <div className="flex-1">
        <div className="text-brand text-xl">
          {"✭".repeat(Math.round(item.rating / 2))}
        </div>
        {item.date && new Date(item.date).toLocaleDateString()}
      </div>
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
    <div className="my-4 lg:my-8">
      <div className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm py-2 px-4">
        Want to read more?
      </div>
      <div className="bg-subtle p-4 border-solid border-subtler border border-t-0 rounded-b-lg">
        <SubscribeForm />
      </div>
    </div>
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
