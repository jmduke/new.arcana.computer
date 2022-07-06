import { Listbox } from "@headlessui/react";
import MetaTags from "components/Scaffolding/MetaTags";
import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
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
  allowSwitchingModes?: boolean;
};

type DisplayMode = "list" | "grid";

const DISPLAY_MODES = [
  {
    mode: "list",
    icon: <Icon.List />,
  },
  {
    mode: "grid",
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
}: CatalogProps) => {
  const defaultFilter = filters.find((f) => f.id === "all");
  const [filter, setFilter] = React.useState(
    defaultFilter ? defaultFilter.label : "all"
  );
  const activeFilter = filters.find((f) => f.label === filter);
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
              <div className="relative">
                <Listbox value={mode} onChange={setMode}>
                  <Listbox.Button>
                    <div className="hover:bg-subtler relative flex items-center space-x-2 capitalize border border-subtler border-solid px-3 py-1 rounded-lg">
                      {DISPLAY_MODES.find((m) => m.mode === mode)?.icon}
                      <div>{mode}</div>
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="w-full absolute mt-2 overflow-auto bg-subtle border border-subtler border-solid px-3 py-1 rounded-lg z-10">
                    {DISPLAY_MODES.map((dm) => (
                      <Listbox.Option key={dm.mode} value={dm.mode}>
                        <div className="flex items-center space-x-2 capitalize cursor-pointer hover:bg-subtler">
                          {dm.icon}
                          <div>{dm.mode}</div>
                        </div>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            )}
          </div>

          <div className="flex-1"></div>

          <div className="relative">
            <Listbox value={filter} onChange={setFilter}>
              <Listbox.Button>
                <div className="hover:bg-subtler relative flex items-center space-x-2 capitalize border border-subtler border-solid px-3 py-1 rounded-lg">
                  <Icon.Collection />
                  <div>{filter}</div>
                </div>
              </Listbox.Button>
              <Listbox.Options className="w-full absolute mt-2 overflow-auto bg-subtle border border-subtler border-solid px-3 py-1 rounded-lg z-10">
                {filters.map((f) => (
                  <Listbox.Option key={f.id} value={f.label}>
                    <div className="flex items-center space-x-2 capitalize cursor-pointer hover:bg-subtler">
                      <div>{f.label}</div>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
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
