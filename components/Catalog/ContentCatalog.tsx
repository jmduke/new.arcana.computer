import ColophonItem from "./ColophonItem";
import Catalog from "./Catalog";
import Icon from "../Icon";
import { MDXRemote } from "next-mdx-remote";

const ContentColophon = ({ item }) => (
  <div>
    <img src={item.image} alt={item.title} className="rounded-lg" />
    {item.author && <ColophonItem icon={<Icon.Author />} value={item.author} />}
    <ColophonItem icon={<Icon.Calendar />} value={item.year} />
    {item.genre && <ColophonItem icon={<Icon.Tag />} value={item.genre} />}
  </div>
);

const ContentCatalog = ({ title, rss, preamble, filters, items }) => {
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
          <div className="text-2xl font-bold">{item.title}</div>
          <div className="my-4 text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700">
            {item.rating}/10 •{" "}
            {item.date && new Date(item.date).toLocaleDateString()}
          </div>
        </div>
      )}
    />
  );
};

export default ContentCatalog;
