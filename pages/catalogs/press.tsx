import Catalog from "components/Catalog/Catalog";
import TextColophon from "components/Catalog/TextColophon";
import fs from "fs";
import matter from "gray-matter";
import compile from "lib/compile";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

const BaseCatalog = ({ title, rss, preamble, filters, items }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => (
        <TextColophon>#{items.length - items.indexOf(item)}</TextColophon>
      )}
      righthandComponent={(item) => (
        <div>
          <a href={item.url}>
            <div className="text-lg font-bold underline mb-2">{item.title}</div>
          </a>
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div>{new Date(item.date).toLocaleDateString("US")}</div>
        </div>
      )}
    />
  );
};

const Preamble = `
I have been fortunate enough to get to navelgaze, opine, and/or thought-lead on a number of podcasts.

Similarly, sometimes I or my projects are covered in the press. I find this less consequential but slightly more fun.
`;

const PressCatalog = ({ preamble, items }) => (
  <BaseCatalog
    title="Press"
    rss="/rss/press.xml"
    preamble={preamble}
    items={items}
    filters={[]}
  />
);

const DIRECTORY = path.join(process.cwd(), "pages/press");

export async function getStaticProps() {
  const fileNames = fs.readdirSync(DIRECTORY);
  const items = await Promise.all(
    fileNames
      .filter((filename) => filename.endsWith("mdx"))
      .sort((a, b) => {
        const aDate = new Date(
          matter.read(path.join(DIRECTORY, a)).data.date
        ).getTime();
        const bDate = new Date(
          matter.read(path.join(DIRECTORY, b)).data.date
        ).getTime();
        return bDate - aDate;
      })
      .map(async function (fileName) {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          id,
          title: matterResult.data.title,
          url: matterResult.data.permalink,
          date: matterResult.data.date.toString() || id.replace(".mdx", ""),
          description: await serialize(matterResult.content),
        };
      })
  );

  return {
    props: {
      items,
      preamble: await compile(Preamble),
    },
  };
}

export default PressCatalog;
