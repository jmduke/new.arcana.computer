import { fetch } from "lib/content";

import { MDXRemote } from "next-mdx-remote";
import Icon from "components/Icon";
import { Type } from "lib/data";

const CatalogPage = ({ item }) => (
  <div>
    <div className="float-left mr-8 mb-2">
      <img
        src={item.image}
        alt={item.title}
        style={{ maxWidth: "12rem" }}
        className="rounded-lg"
      />
      <div className="rounded-lg bg-subtle mt-8 p-2 px-3">
        {item.author && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon.Author /> <div className=" flex-1">{item.author}</div>
          </div>
        )}
        {item.year && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon.Calendar /> <div className=" flex-1">{item.year}</div>
          </div>
        )}
        {item.genre && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon.Tag /> <div className=" flex-1">{item.genre}</div>
          </div>
        )}
      </div>
    </div>
    <div className="text-2xl font-bold">{item.title}</div>
    <div className="my-4 text-lg">
      {item.description && <MDXRemote {...item.description} />}
    </div>
    <div className="my-4 text-gray-700">
      {item.rating}/10 • {item.date && new Date(item.date).toLocaleDateString()}
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
  const item = items.filter((i) => i.slug === params.slug)[0];
  return {
    props: {
      item,
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
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default CatalogPage;
