import H2 from "components/Markdown/H2";
import H3 from "components/Markdown/H3";
import Tag from "components/Tag";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

import Catalog, { Filter } from "./Catalog";
import ImageColophon from "./SourceImage";

type Props = {
  title: string;
  rss: string;
  preamble: any;
  filters: Filter[];
  items: any[];
  name: string;
};

const ContentCatalog = ({
  title,
  rss,
  preamble,
  filters,
  items,
  name,
}: Props) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => (
        <Link href={`/catalogs/${name}/${item.slug}`}>
          <div className="cursor-pointer relative group">
            <a className="group-hover:brightness-0">
              <ImageColophon image={item.image} alt={item.title} />
            </a>
            <div className="absolute top-4 bottom-4 left-8 right-8 invisible group-hover:visible">
              <div className="items-center text-center flex h-48">
                <div className="m-auto text-white">
                  <H3>{item.title}</H3>
                  <div className="text-brand">
                    {"✭".repeat(Math.round(item.rating / 2))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
      righthandComponent={(item) => (
        <div className="flex-1">
          <Link href={`/catalogs/${name}/${item.slug}`}>
            <div className="cursor-pointer hover:text-brand -mt-20">
              <H2>{item.title}</H2>
            </div>
          </Link>
          {item.author && item.year && (
            <div className="text-lg uppercase text-gray-600 -mt-4">
              {item.author} • {item.year}
            </div>
          )}
          {item.genre && (
            <div className="my-2">
              <Tag value={item.genre} />
            </div>
          )}
          <div className="my-4 text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700">
            <div className="flex-1">
              <div className="text-brand text-xl">
                {"✭".repeat(Math.round(item.rating / 2))}
              </div>
              {item.date && new Date(item.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default ContentCatalog;
