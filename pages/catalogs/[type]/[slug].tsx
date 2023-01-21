import DetailPage from "components/DetailPage";
import H3 from "components/Markdown/H3";
import { fetchAll, fetchAllQuotes } from "lib/content";
import { CONTENT_TYPE_TO_TYPE_SLUG, Type } from "lib/data";

const CatalogPage = ({ item, quotes }) => (
  <DetailPage
    title={item.title}
    subtitle={item.author && item.year && `${item.author} • ${item.year}`}
    body={item.description}
    image={`/content/${item.image || item.id + ".jpg"}`}
    catalog={item.type}
    tags={item.genre}
    colophon={
      <div className="flex-1 flex items-center space-x-4">
        {item.date && (
          <div className="italic">
            {new Date(item.date).toLocaleDateString()}
          </div>
        )}
        <div className="text-brand text-xl">
          {"✭".repeat(Math.round(item.rating / 2))}
        </div>
      </div>
    }
    postscript={
      quotes.length > 0 && (
        <div>
          <H3>Highlights</H3>
          <div className="space-y-8">
            {quotes.map((quote, i) => (
              <div key={i} className="text-lg">
                <span className="bg-yellow-100">{quote}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  />
);

export async function getStaticProps({ params }) {
  const type = (Object.keys(CONTENT_TYPE_TO_TYPE_SLUG) as Array<Type>).find(
    (k: Type) => CONTENT_TYPE_TO_TYPE_SLUG[k] === params.type
  );
  const items = await fetchAll();
  const quotes = await fetchAllQuotes(items);
  const item = items.filter((i) => i.slug === params.slug)[0];
  const relevantQuotes = quotes
    .filter((q) => (q.source ? q.source === item.title : false))
    .map((q) => q.content);
  return {
    props: {
      item,
      quotes: relevantQuotes,
      breadcrumbs: [
        {
          text: type,
          href: `/catalogs/${params.type}`,
        },
        {
          text: item.title,
          href: `/catalogs/${params.type}/${item.slug}`,
        },
      ],
    },
    revalidate: 1000,
  };
}

export async function getStaticPaths() {
  const allItems = await fetchAll();
  const paths: string[] = (
    Object.entries(CONTENT_TYPE_TO_TYPE_SLUG) as Array<[Type, string]>
  )
    .map(([type, slug]) => {
      return allItems
        .filter((i) => i.type === type)
        .filter((i) => i.id !== "")
        .filter((i) => i.status !== "")
        .map((item) => `/catalogs/${slug}/${item.id}`);
    })
    .flat();
  return {
    paths,
    fallback: "blocking",
  };
}

export default CatalogPage;
