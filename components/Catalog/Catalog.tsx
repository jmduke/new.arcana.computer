import MetaTags from "components/Scaffolding/MetaTags";
import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import React, { ReactNode } from "react";

import Icon from "../../components/Icon";
import H1 from "../../components/Markdown/H1";
import Notice from "../../components/Notice";
import Dropdown from "./Dropdown";

export type Filter = {
  id: string;
  label: string;
  icon: ReactNode;
  filter: (item: any) => boolean;
};

export type Props = {
  title: string;
  rss: string;
  preamble: any;
  filters: Filter[];
  items: any[];
  lefthandComponent?: (item: any) => React.ReactNode;
  righthandComponent?: (item: any) => React.ReactNode;
  allowSwitchingModes?: boolean;
};

type DisplayMode = "list" | "grid";

const DISPLAY_MODES: {
  id: DisplayMode;
  label: string;
  icon: ReactNode;
}[] = [
  {
    id: "list",
    label: "List",
    icon: <Icon.List />,
  },
  {
    id: "grid",
    label: "Grid",
    icon: <Icon.Grid />,
  },
];

const Catalog = ({
  title,
  rss,
  preamble,
  filters,
  items,
  lefthandComponent,
  righthandComponent,
  allowSwitchingModes = true,
}: Props) => {
  const defaultFilter = filters.find((f) => f.id === "all");
  const [filter, setFilter] = React.useState(
    defaultFilter ? defaultFilter.id : "all"
  );
  const activeFilter = filters.find((f) => f.id === filter);
  const [mode, setMode] = React.useState("list");

  return (
    <div className="space-y-8">
      <MetaTags title={title} description={`My review of ${title}`} />
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
        <div className="bg-subtle rounded-lg py-2 px-4 text-sm flex relative">
          <div>
            {allowSwitchingModes && (
              <Dropdown value={mode} handler={setMode} values={DISPLAY_MODES} />
            )}
          </div>

          <div className="flex-1"></div>

          <div className="relative">
            <Dropdown value={filter} handler={setFilter} values={filters} />
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
              {lefthandComponent && lefthandComponent(item) && (
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
