import DetailPage from "components/DetailPage";
import { fetchAll, fetchAllQuotes } from "lib/content";
import { CONTENT_TYPE_TO_TYPE_SLUG } from "lib/data";
import Link from "node_modules/next/link";

const CatalogPage = ({ item }) => (
  <DetailPage
    title={`Quote #${item.id}`}
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

export async function getStaticProps({ params }) {
  const items = await fetchAll();
  const quotes = await fetchAllQuotes();
  const item = quotes.filter((i) => i.id == params.slug)[0];
  item.source = items.filter((i) => i.title === item.source)[0] || {
    name: item.author,
  };
  return {
    props: {
      item,
      breadcrumbs: [
        {
          text: "Notebook",
          href: `/catalogs/quotes`,
        },
        {
          text: `#${item.id}`,
          href: `/catalogs/quotes/${item.id}`,
        },
      ],
    },
  };
}

export async function getStaticPaths() {
  const items = await fetchAllQuotes();
  const paths = items.map((item) => `/catalogs/quotes/${item.id}`);
  return {
    paths,
    fallback: false,
  };
}

export default CatalogPage;
