import BaseCatalog from "components/Catalog/Catalog";
import H2 from "components/Markdown/H2";
import Tag from "components/Tag";
import compile from "lib/compile";
import { SITE_URL } from "lib/constants";
import { fetchAllPosts } from "lib/content";
import { generate as generateRSS } from "lib/rss";
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

export async function getStaticProps() {
  const items = await fetchAllPosts();
  await generateRSS(
    items.map((i) => {
      return {
        title: i.title,
        date: new Date(i.date),
        html: i.htmlDescription,
        url: `${SITE_URL}/blog/${i.id}`,
        category: "Essay",
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
