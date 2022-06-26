import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Head from "next/head";

import Icon from "./Icon";
import SubscribeForm from "./SubscribeForm";

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
    <div className="my-4 lg:my-8">
      <div className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm py-2 px-4">
        Want to read more?
      </div>
      <div className="bg-subtle p-4 border-solid border-subtler border border-t-0 rounded-b-lg">
        <SubscribeForm />
      </div>
    </div>
  </div>
);

export default MarkdownPage;
