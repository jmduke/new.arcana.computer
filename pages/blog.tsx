import BaseCatalog from "components/Catalog/Catalog";
import H2 from "components/Markdown/H2";
import { fetchAllRecords } from "lib/airtable";
import compile from "lib/compile";
import slugify from "lib/slugify";
import { MDXRemote } from "next-mdx-remote";
import Link from "node_modules/next/link";

type Blog = {
  id: string;
  title: string;
  description: any;
  date: number;
  slug: string;
};

const Preamble = `
For topics that aren't quite essays but aren't quite tweets, either. (A self-imposed rule: no entry here should take longer than ten minutes to write and publish.)
`;

const Blog = ({ preamble, items }) => {
  return (
    <BaseCatalog
      title="Blog"
      rss="/rss/blog.xml"
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
        </div>
      )}
    />
  );
};

export const mungeRecord = async (record: any): Promise<Blog> => {
  return {
    id: record.id,
    description: record.fields.Content
      ? await compile(record.fields.Content)
      : null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    title: record.fields.Name,
    slug: slugify(record.fields.Name),
  };
};

export async function getStaticProps() {
  const rawRecords = await fetchAllRecords("Snippets");
  const items = [
    ...(await Promise.all(
      rawRecords.map(async (record) => await mungeRecord(record))
    )),
  ].sort((a, b) => b.date - a.date);
  return {
    props: {
      items,
      preamble: await compile(Preamble),
    },
  };
}

export default Blog;
