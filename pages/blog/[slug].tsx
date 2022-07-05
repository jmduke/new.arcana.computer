import DetailPage from "components/DetailPage";
import { fetchAllRecords } from "lib/airtable";
import { mungeRecord } from "pages/blog";

const CatalogPage = ({ item }) => (
  <DetailPage
    title={item.title}
    body={item.description}
    tags={item.tags}
    colophon={
      <div className="flex-1 italic">
        {item.date && new Date(item.date).toLocaleDateString()}
      </div>
    }
  />
);

export async function getStaticProps({ params }) {
  const rawItems = await fetchAllRecords("Snippets");
  const items = await Promise.all(
    rawItems.map(async (record) => mungeRecord(record))
  );
  const item = items.filter((i) => i.slug === params.slug)[0];
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
          href: `/blog/${item.slug}`,
        },
      ],
    },
  };
}

export async function getStaticPaths() {
  const rawRecords = await fetchAllRecords("Snippets");
  const items = await Promise.all(
    rawRecords.map(async (record) => mungeRecord(record))
  );
  return {
    paths: items
      .filter((item) => item.slug)
      .map((item) => `/blog/${item.slug}`),
    fallback: false,
  };
}

export default CatalogPage;
