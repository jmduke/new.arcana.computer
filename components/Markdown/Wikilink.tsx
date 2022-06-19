import slugify from "lib/slugify";

const Wikilink = (props) => {
  const path = window.location.pathname;
  const [_, __, catalog, ___] = path.split("/");

  return (
    <a
      className="text-brand underline cursor-pointer"
      {...props}
      href={`/catalogs/${catalog}/${slugify(props.children)}`}
    >
      {props.children}
    </a>
  );
};

export default Wikilink;
