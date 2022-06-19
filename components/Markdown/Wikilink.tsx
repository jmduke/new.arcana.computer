import slugify from "lib/slugify";
import { useRouter } from "next/router";

const Wikilink = (props) => {
  const { asPath } = useRouter();

  const [_, __, catalog, ___] = asPath.split("/");

  return (
    <a
      className="hover:text-brand cursor-pointer bg-red-100 px-1 inline-block"
      {...props}
      href={`/catalogs/${catalog}/${slugify(props.children)}`}
    >
      {props.children}&nbsp;↗
    </a>
  );
};

export default Wikilink;
