import DetailPage from "components/DetailPage";
import { fetchAllRecords } from "lib/airtable";
import { CONTENT_TYPE_TO_TYPE_SLUG } from "lib/data";
import { munge, Quote } from "lib/quotes";
import Link from "node_modules/next/link";

const CatalogPage = ({ item }) => (
  <DetailPage
    title={`Quote #${item.name}`}
    body={item.description}
    image={item.source && item.source.image}
    colophon={
      <div className="italic text-gray-500">
        {item.source.url ? (
          <a href={item.source.url} className="text-brand underline">
            {item.source.name}
          </a>
        ) : item.source.title ? (
          <Link
            href={`/catalogs/${CONTENT_TYPE_TO_TYPE_SLUG[item.source.type]}/${
              item.source.slug
            }`}
          >
            <span className="text-brand underline cursor-pointer">
              {item.source.title}
              {item.source.author && ` (${item.source.author})`}
            </span>
          </Link>
        ) : (
          item.source.name
        )}{" "}
        {item.date && (
          <Link href={`/catalogs/quotes/${item.name}`}>
            <span>
              ·{" "}
              <span className="cursor-pointer">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </span>
          </Link>
        )}
      </div>
    }
  />
);

export async function getServerSideProps({ params }) {
  const rawContent = await fetchAllRecords("Content");
  const rawRecords = await fetchAllRecords("Notebook");
  const items = await Promise.all(
    rawRecords.map(async (record) => munge(record, rawContent))
  );
  const item = items.filter((i) => i.name == params.slug)[0];
  return {
    props: {
      item,
      breadcrumbs: [
        {
          text: "Notebook",
          href: `/catalogs/quotes`,
        },
        {
          text: `#${item.name}`,
          href: `/catalogs/quotes/${item.name}`,
        },
      ],
    },
  };
}

// export async function getStaticPaths() {
//   const rawContent = await fetchAllRecords("Content");
//   const rawRecords = await fetchAllRecords("Notebook");
//   const items = await Promise.all(
//     rawRecords.map(async (record) => munge(record, rawContent))
//   );
//   const paths = items.map((item) => `/catalogs/quotes/${item.name}`);
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default CatalogPage;
