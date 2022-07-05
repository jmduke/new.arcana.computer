import BaseCatalog from "components/Catalog/Catalog";
import { generate as generateRSS } from "components/Catalog/rss";
import H2 from "components/Markdown/H2";
import Tag from "components/Tag";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import { SITE_URL } from "lib/constants";
import slugify from "lib/slugify";
import { marked } from "marked";
import { MDXRemote } from "next-mdx-remote";
import Link from "node_modules/next/link";

export type BlogPost = {
  id: string;
  title: string;
  description: any;
  htmlDescription: string;
  date: number;
  slug: string;
  tags: string[];
};

const RSS_PATH = "/rss/blog.xml";

const Preamble = `
For topics that aren't quite essays but aren't quite tweets, either. (A self-imposed rule: no entry here should take longer than ten minutes to write and publish.)
`;

const Blog = ({ preamble, items }) => {
  return (
    <BaseCatalog
      title="Blog"
      rss={RSS_PATH}
      preamble={preamble}
      filters={[]}
      items={items}
      righthandComponent={(item) => (
        <div className="flex-1">
          <div className="cursor-pointer">
            <Link href={`/blog/${item.slug}`}>
              <a>
                <H2>{item.title}</H2>
              </a>
            </Link>
          </div>
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700 space-x-4 flex">
            <div className="flex-1">
              {item.date && new Date(item.date).toLocaleDateString()}
            </div>
            {item.tags && <Tag value={item.tags} />}
          </div>
        </div>
      )}
    />
  );
};

export const mungeRecord = async (record: any): Promise<BlogPost> => {
  return {
    id: record.id,
    description: record.fields.Content
      ? await compile(record.fields.Content)
      : null,
    htmlDescription: marked.parse(record.fields.Content),
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    title: record.fields.Name,
    slug: slugify(record.fields.Name),
    tags: record.fields.Tags,
  };
};

export async function getStaticProps() {
  const rawRecords = await fetchAllRecords("Snippets");
  const items = [
    ...(await Promise.all(
      rawRecords.map(async (record) => await mungeRecord(record))
    )),
  ].sort((a, b) => b.date - a.date);
  await generateRSS(
    items.map((i) => {
      return {
        title: i.title,
        date: new Date(i.date),
        html: i.htmlDescription,
        url: `${SITE_URL}/blog/${i.slug}`,
      };
    }),
    "blog"
  );
  return {
    props: {
      items,
      preamble: await compile(Preamble),
    },
  };
}

export default Blog;
