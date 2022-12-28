import Widget from "./Widget";

const ContentWidget = ({ label, items }) => {
  return (
    <Widget
      label={label}
      items={items.map((item) => {
        return {
          left: (
            <div className="font-bold text-gray-700 hover:text-brand">
              <a href={`/catalogs/${item.catalog}/${item.slug}`}>
                {item.title}
              </a>
            </div>
          ),
          right: (
            <div className="text-gray-500 tabular-nums text-right flex-1">
              <span className="text-brand text-xl">
                {"✭".repeat(Math.round(item.rating / 2))}
              </span>
              &nbsp;
              {new Date(item.date).toLocaleDateString("en-US", {
                // you can use undefined as first argument
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          ),
        };
      })}
    />
  );
};

export default ContentWidget;
