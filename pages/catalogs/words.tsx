import Catalog from "components/Catalog/MiscellanyCatalog";
import fs from "fs";
import matter from "gray-matter";
import compile from "lib/compile";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

type Word = {
  id: string;
  title: string;
  description: any;
  date: number;
  source: string;
};

const Preamble = `
When I was in high school and even more insufferable than I am now, a friend and I started a tumblr called "sun words".  The concept of this was to collect words that we discovered that were particularly succulent or mellifluous. [^1]

I have found myself learning more and more words recently.  This is fun and good: I was worried for a while that my days of adapting and playing with the English language were largely behind me.  I thought it would be interesting and illustrative to collect a list of the words I've learned recently alongside the sources from which I've gleaned them.

When I first started building this catalog, I expected the plurality to be from the NYT crossword [^2], and the data appears to bear that out:

[^1]: Why "sun words"? Because we were high schoolers, and because we learned of the concept of "SAT words" — words that made Flesch-Kincaid salivate — and because _Sun_day comes after _Sat_urday.  (I told you — insufferable.)
[^2]: Of which I recommend you make a daily habit!
`;

const WordsCatalog = ({ preamble, items }) => (
  <Catalog
    title="Words"
    rss="/rss/words.xml"
    preamble={preamble}
    items={items}
    filters={[]}
    name="words"
    hideImage={true}
  />
);

const DIRECTORY = path.join(process.cwd(), "pages/catalogs/words");

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
          date: matterResult.data.date
            ? matterResult.data.date.toString()
            : id.replace(".mdx", ""),
          description: await serialize(matterResult.content),
          source: matterResult.data.content || matterResult.data.source || "",
        };
      })
  );

  return {
    props: {
      items: items.filter((item) => item.title !== undefined),
      preamble: await compile(Preamble),
    },
  };
}

export default WordsCatalog;
