import ColophonItem from "./ColophonItem";
import Catalog from "./Catalog";
import Icon from "../Icon";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

const ContentColophon = ({ item }) => (
  <div>
    <img src={item.image} alt={item.title} className="rounded-lg" />
    {item.author && <ColophonItem icon={<Icon.Author />} value={item.author} />}
    <ColophonItem icon={<Icon.Calendar />} value={item.year} />
  </div>
);

const ContentCatalog = ({ title, rss, preamble, filters, items, name }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => <ContentColophon item={item} />}
      righthandComponent={(item) => (
        <div className="flex-1">
          <Link href={`/catalogs/${name}/${item.slug}`}>
            <div className="text-2xl font-bold cursor-pointer">
              {item.title}
            </div>
          </Link>
          <div className="my-4 text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700">
            {item.rating}/10 •{" "}
            {item.date && new Date(item.date).toLocaleDateString()}
          </div>

          {item.genre && (
            <div className="rounded-full bg-subtle text-sm inline-block px-3">
              <ColophonItem icon={<Icon.Tag />} value={item.genre} />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ContentCatalog;
