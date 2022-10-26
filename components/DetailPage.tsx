import ImageColophon from "components/Catalog/SourceImage";
import H1 from "components/Markdown/H1";
import SubscribeFormWidget from "components/SubscribeFormWidget";
import Tag from "components/Tag";
import { MDXRemote } from "next-mdx-remote";
import { ReactNode } from "react";

import MetaTags from "./Scaffolding/MetaTags";

type Props = {
  title: string;
  subtitle?: string;
  body: any;
  image?: string;
  catalog?: string;
  tags?: string;
  colophon?: ReactNode;
  postscript?: ReactNode;
};

const DetailPage = ({
  title,
  body,
  subtitle,
  catalog,
  tags,
  image,
  colophon,
  postscript,
}: Props) => (
  <div>
    <MetaTags
      title={title}
      description={subtitle}
      image={image}
      catalog={catalog}
    />
    {image && (
      <div className="float-left mr-8 mb-2">
        <ImageColophon image={image} alt={image} />
      </div>
    )}
    <H1>{title}</H1>
    {subtitle && (
      <div className="text-lg uppercase text-gray-600">{subtitle}</div>
    )}
    <div className="my-4 text-lg">
      {body ? <MDXRemote {...body} /> : <div>No writeup yet.</div>}
    </div>
    <div className="my-4 text-gray-700 space-x-4 flex">
      {colophon}
      {tags && <Tag value={tags} />}
    </div>
    {postscript}
    <SubscribeFormWidget />
  </div>
);

export default DetailPage;
