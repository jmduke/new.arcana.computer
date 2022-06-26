import H1 from "components/Markdown/H1";
import SubscribeForm from "components/SubscribeForm";
import Tag from "components/Tag";
import Widget from "components/Widget";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import slugify from "lib/slugify";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";

type Blog = {
  id: string;
  title: string;
  description: any;
  date: number;
  slug: string;
  tags: string[];
};

const mungeRecord = async (record: any): Promise<Blog> => {
  return {
    id: record.id,
    description: record.fields.Content
      ? await compile(record.fields.Content)
      : null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    title: record.fields.Name,
    slug: slugify(record.fields.Name),
    tags: record.fields.Tags,
  };
};

const CatalogPage = ({ item }) => (
  <div>
    <Head>
      <title>{item.title}</title>
    </Head>
    <H1>{item.title}</H1>
    <div className="my-4 text-lg">
      {item.description ? (
        <MDXRemote {...item.description} />
      ) : (
        <div>No writeup yet.</div>
      )}
    </div>
    <div className="my-4 text-gray-700 space-x-4 flex">
      <div className="flex-1">
        {item.date && new Date(item.date).toLocaleDateString()}
      </div>
      {item.tags && <Tag value={item.tags} />}
    </div>
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

export async function getStaticProps({ params }) {
  const rawItems = await fetchAllRecords("Snippets");
  const items = await Promise.all(
    rawItems.map(async (record) => mungeRecord(record))
  );
  const item = items.filter((i) => i.slug === params.slug)[0];
  return {
    props: {
      item,
    },
  };
}

export async function getStaticPaths() {
  const rawRecords = await fetchAllRecords("Snippets");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record))
  );
  return {
    paths: items
      .filter((item) => item.slug)
      .map((item) => `/blog/${item.slug}`),
    fallback: false,
  };
}

export default CatalogPage;
