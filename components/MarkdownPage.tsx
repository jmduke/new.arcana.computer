import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Head from "next/head";

import Icon from "./Icon";

const MarkdownPage = ({ meta, children }) => (
  <div>
    <Head>
      <title>{meta.title}</title>
    </Head>
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
  </div>
);

export default MarkdownPage;
