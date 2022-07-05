import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Head from "next/head";
import { ReactNode } from "react";

import Icon from "./Icon";
import MetaTags, { Props as MetaProps } from "./Scaffolding/MetaTags";
import SubscribeFormWidget from "./SubscribeFormWidget";

type Props = {
  meta: MetaProps;
  children: ReactNode;
};

const MarkdownPage = ({ meta, children }: Props) => (
  <div>
    <MetaTags {...meta} />
    <div
      className="text-gray-400 text-sm rounded-lg bg-subtle px-3 py-2 mb-4 flex items-center space-x-2 text-center justify-center"
      style={{ width: LEFTHAND_COLUMN_SIZE }}
    >
      <Icon.Calendar />
      <div>
        Updated <strong>{meta.date}</strong>
      </div>
    </div>
    {children}
    <SubscribeFormWidget />
  </div>
);

export default MarkdownPage;
