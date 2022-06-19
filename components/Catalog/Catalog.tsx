import React from "react";
import Icon from "../../components/Icon";
import H1 from "../../components/Markdown/H1";
import Notice from "../../components/Notice";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Head from "next/head";

const Catalog = ({
  title,
  rss,
  preamble,
  filters,
  items,
  lefthandComponent,
  righthandComponent,
}) => {
  const [filter, setFilter] = React.useState("all");
  const activeFilter = filters.find((f) => f.id === filter);

  return (
    <div className="space-y-8">
      <Head>
        <title>{title}</title>
      </Head>
      <H1>{title}</H1>
      <Notice
        label={
          <div className="flex space-x-2 items-center">
            <Icon.RSS />
            <div>Follow changes over time via RSS</div>
          </div>
        }
      >
        <Link href={rss}>
          <a className="text-brand underline">{rss}</a>
        </Link>
      </Notice>
      <MDXRemote {...preamble} />
      {filters.length > 0 && (
        <div className="bg-subtle rounded-lg py-2 px-4 text-sm flex">
          <div className="font-bold flex-1">Filter this list</div>
          <div className="space-x-2 flex">
            {filters.map((f) => (
              <label
                htmlFor={f.id}
                key={f.id}
                className="flex items-center space-x-1"
              >
                <input
                  type="radio"
                  name="filter"
                  id={f.id}
                  checked={f.id === filter}
                  onChange={() => setFilter(f.id)}
                />
                <div>{f.label}</div>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-16">
        {items
          .filter(activeFilter ? activeFilter.filter : () => true)
          .map((item) => (
            <div key={item.id} className="md:flex md:space-x-8 md:items-start">
              <div
                style={{ maxWidth: LEFTHAND_COLUMN_SIZE }}
                className="space-y-2 md:sticky top-16 inline-block float-left mr-8"
              >
                {lefthandComponent(item)}
              </div>
              {righthandComponent(item)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
