import ImageColophon from "components/Catalog/SourceImage";
import H1 from "components/Markdown/H1";
import SubscribeFormWidget from "components/SubscribeFormWidget";
import Tag from "components/Tag";
import { fetchAllRecords } from "lib/airtable";
import { MDXRemote } from "next-mdx-remote";
import Head from "node_modules/next/head";
import Link from "node_modules/next/link";

import { mungeRecord } from "../quotes";

const CONTENT_TYPE_TO_TYPE_SLUG: { [key: string]: string } = {
  Book: "books",
  Game: "games",
  Movie: "movies",
  Album: "music",
};

const CatalogPage = ({ item }) => (
  <div>
    <Head>
      <title>Quote #{item.name}</title>
    </Head>
    <div className="float-left mr-8 mb-2">
      <ImageColophon
        image={item.source && item.source.image}
        alt={item.title}
      />
    </div>
    <H1>Quote #{item.name}</H1>

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
    <div className="italic text-gray-500">
      {item.source.url ? (
        <a href={item.source.url} className="text-brand underline">
          {item.source.name}
        </a>
      ) : item.source.title ? (
        <Link
          href={`/catalogs/${CONTENT_TYPE_TO_TYPE_SLUG[item.source.type]}/${
            item.source.slug
          }`}
        >
          <span className="text-brand underline cursor-pointer">
            {item.source.title}
            {item.source.author && ` (${item.source.author})`}
          </span>
        </Link>
      ) : (
        item.source.name
      )}{" "}
      {item.date && (
        <Link href={`/catalogs/quotes/${item.name}`}>
          <span>
            ·{" "}
            <span className="cursor-pointer">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </span>
        </Link>
      )}
    </div>
    <SubscribeFormWidget />
  </div>
);

export async function getStaticProps({ params }) {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Notebook");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record, rawContent))
  );
  const item = items.filter((i) => i.name == params.slug)[0];
  return {
    props: {
      item,
    },
  };
}

export async function getStaticPaths() {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Notebook");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record, rawContent))
  );
  const paths = items.map((item) => `/catalogs/quotes/${item.name}`);
  return {
    paths,
    fallback: false,
  };
}

export default CatalogPage;
