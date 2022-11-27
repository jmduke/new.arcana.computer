import DetailPage from "components/DetailPage";

import { getItems } from "./lib";

const CatalogPage = ({ item }) => (
  <DetailPage
    title={item.title}
    body={item.description}
    catalog={"Blog"}
    tags={item.tags}
    colophon={
      <div className="flex-1 italic">
        {item.date && new Date(item.date).toLocaleDateString()}
      </div>
    }
  />
);

export async function getStaticProps({ params }) {
  const items = await getItems();
  const item = items.find((i) => i.id === params.slug);
  return {
    props: {
      item,
      breadcrumbs: [
        {
          text: "Blog",
          href: "/blog",
        },
        {
          text: item.title,
          href: `/blog/${item.id}`,
        },
      ],
    },
  };
}

export async function getStaticPaths() {
  const items = await getItems();

  return {
    paths: items.filter((item) => item.id).map((item) => `/blog/${item.id}`),
    fallback: false,
  };
}

export default CatalogPage;
