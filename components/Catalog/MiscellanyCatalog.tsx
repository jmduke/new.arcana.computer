import { CONTENT_TYPE_TO_TYPE_SLUG } from "lib/data";
import { MDXRemote } from "next-mdx-remote";
import Link from "node_modules/next/link";

import Catalog, { Filter } from "./Catalog";
import ImageColophon from "./SourceImage";

type Props = {
  title: string;
  rss: string;
  preamble: any;
  filters: Filter[];
  items: any[];
  name: string;
  hideImage?: boolean;
};

const MiscellanyCatalog = ({
  title,
  rss,
  preamble,
  filters,
  items,
  name,
  hideImage,
}: Props) => {
  return (
    <Catalog
      allowSwitchingModes={false}
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) =>
        hideImage ? (
          false
        ) : (
          <ImageColophon
            image={`/content/${item.image || item.id + ".jpg"}`}
            alt={item.title}
          />
        )
      }
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
                  {item.source.author && ` (${item.source.author})`}
                </span>
              </Link>
            ) : (
              item.source.name
            )}{" "}
            {item.date && item.name && (
              <Link href={`/catalogs/${name}/${item.name}`}>
                <span>
                  ·{" "}
                  <span className="cursor-pointer">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default MiscellanyCatalog;
