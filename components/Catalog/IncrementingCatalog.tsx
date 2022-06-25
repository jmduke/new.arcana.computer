import { MDXRemote } from "next-mdx-remote";
import Link from "node_modules/next/link";

import Catalog from "./Catalog";
import ImageColophon from "./SourceImage";

const CONTENT_TYPE_TO_TYPE_SLUG: { [key: string]: string } = {
  Book: "books",
  Game: "games",
  Movie: "movies",
  Album: "music",
};

const IncrementingCatalog = ({ title, rss, preamble, filters, items }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => (
        <ImageColophon image={item.source && item.source.image} />
      )}
      righthandComponent={(item) => (
        <div className="flex-1">
          {item.title && <div className="text-lg font-bold">{item.title}</div>}
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="italic text-gray-500">
            {item.source.url ? (
              <a href={item.source.url} className="text-brand underline">
                {item.source.name}
              </a>
            ) : item.source.title ? (
              <Link
                href={`/catalogs/${
                  CONTENT_TYPE_TO_TYPE_SLUG[item.source.type]
                }/${item.source.slug}`}
              >
                <span className="text-brand underline cursor-pointer">
                  {item.source.title}
                </span>
              </Link>
            ) : (
              item.source.name
            )}
          </div>
        </div>
      )}
    />
  );
};

export default IncrementingCatalog;
