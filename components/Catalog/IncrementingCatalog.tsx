import Catalog from "./Catalog";
import { MDXRemote } from "next-mdx-remote";
import TextColophon from "./TextColophon";

const IncrementingCatalog = ({ title, rss, preamble, filters, items }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) =>
        item.source && item.source.image ? (
          <img
            src={item.source.image}
            alt={item.source.image}
            className="rounded-lg"
          />
        ) : (
          <TextColophon>No image.</TextColophon>
        )
      }
      righthandComponent={(item) => (
        <div>
          {item.title && <div className="text-lg font-bold">{item.title}</div>}
          <div className="text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="italic text-gray-500">
            {item.source.url ? (
              <a href={item.source.url} className="text-brand underline">
                {item.source.name}
              </a>
            ) : (
              item.source.title || item.source.name
            )}
          </div>
        </div>
      )}
    />
  );
};

export default IncrementingCatalog;
