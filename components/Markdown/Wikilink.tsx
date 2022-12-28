import items from "../../public/allItems.json";

const Wikilink = (props) => {
  const item = items.find((i) => i.title === props.children);

  if (!item) {
    return <span>{props.children}</span>;
  }

  return (
    <a
      className="hover:text-brand cursor-pointer bg-red-100 px-1 inline-block"
      {...props}
      href={`/catalogs/${item.catalog}/${item.slug}`}
    >
      {props.children}&nbsp;↗
    </a>
  );
};

export default Wikilink;
