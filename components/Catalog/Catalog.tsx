import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

import Icon from "../../components/Icon";
import H1 from "../../components/Markdown/H1";
import Notice from "../../components/Notice";

type CatalogProps = {
  title: string;
  rss: string;
  preamble: any;
  filters: {
    id: string;
    label: string;
    filter: (item: any) => boolean;
  }[];
  items: any[];
  lefthandComponent?: (item: any) => React.ReactNode;
  righthandComponent?: (item: any) => React.ReactNode;
};

type DisplayMode = "list" | "grid";

const Catalog = ({
  title,
  rss,
  preamble,
  filters,
  items,
  lefthandComponent,
  righthandComponent,
}: CatalogProps) => {
  const [filter, setFilter] = React.useState("all");
  const activeFilter = filters.find((f) => f.id === filter);
  const [mode, setMode] = React.useState("list");

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
          <div className="flex-1">
            <div className="flex">
              <strong className="mr-2">Display as:</strong>
              <div className="flex space-x-2">
                {["grid", "list"].map((f) => (
                  <label
                    htmlFor={f}
                    key={f}
                    className="flex items-center space-x-1"
                  >
                    <input
                      type="radio"
                      name="mode"
                      id={f}
                      checked={f === mode}
                      onChange={() => setMode(f)}
                    />
                    <div className="capitalize">{f}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="space-x-2 flex">
            <strong>Filter to:</strong>
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
      <div
        className={
          {
            list: "space-y-16",
            grid: "grid grid-cols-3 lg:grid-cols-5 gap-4 lg:-ml-52 lg:w-oversize",
          }[mode]
        }
      >
        {items
          .filter(activeFilter ? activeFilter.filter : () => true)
          .map((item) => (
            <div
              key={item.id}
              className="md:flex md:space-x-8 md:items-start clear-left"
            >
              {lefthandComponent && (
                <div
                  style={{ maxWidth: LEFTHAND_COLUMN_SIZE }}
                  className={
                    {
                      list: "space-y-2 mr-4 md:mr-0 md:sticky top-16 inline-block float-left",
                      grid: "h-48 overflow-hidden",
                    }[mode]
                  }
                >
                  {lefthandComponent(item)}
                </div>
              )}
              {mode === "list" && righthandComponent(item)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
