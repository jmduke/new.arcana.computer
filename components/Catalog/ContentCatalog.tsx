import Tag from "components/Tag";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

import Catalog from "./Catalog";
import ImageColophon from "./SourceImage";

const ContentCatalog = ({ title, rss, preamble, filters, items, name }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => <ImageColophon image={item.image} />}
      righthandComponent={(item) => (
        <div className="flex-1">
          <Link href={`/catalogs/${name}/${item.slug}`}>
            <div className="text-2xl font-bold cursor-pointer font-serif">
              {item.title}
            </div>
          </Link>
          {item.author && item.year && (
            <div className="text-lg uppercase text-gray-600">
              {item.author} • {item.year}
            </div>
          )}
          <div className="my-4 text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700">
            {item.rating}/10 •{" "}
            {item.date && new Date(item.date).toLocaleDateString()}
          </div>

          {item.genre && <Tag value={item.genre} />}
        </div>
      )}
    />
  );
};

export default ContentCatalog;
