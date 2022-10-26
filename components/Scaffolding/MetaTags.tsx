import Head from "next/head";
import { useRouter } from "next/router";

export type Props = {
  title: string;
  description: string;
  catalog?: string;
  image?: string;
  date?: string;
};

const MetaTags = ({ title, description, image, date, catalog }: Props) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description} name="description" />
      <meta
        property="og:url"
        content={`https://arcana.computer${router.asPath}`}
      />
      <link rel="canonical" href={`https://arcana.computer${router.asPath}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="arcana.computer" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={
          image
            ? `https://arcana.computer/api/og?data=${title},${catalog},${image}`
            : "https://arcana.computer/share.png"
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jmduke" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image || "https://arcana.computer/share.png"}
      />
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
};

export default MetaTags;
