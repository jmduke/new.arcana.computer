import Widget from "./Widget";

type CurrentItem = {
  verb: string;
  title: string;
};

type CurrentItemGroup = {
  verb: string;
  titles: string[];
};

const groupItems = (items: CurrentItem[]) => {
  const verbToItems: { [verb: string]: CurrentItem[] } = {};
  items.map((item) => {
    if (!verbToItems[item.verb]) {
      verbToItems[item.verb] = [];
    }
    verbToItems[item.verb].push(item);
  });
  return Object.entries(verbToItems).map(([verb, items]) => ({
    verb,
    titles: items.map((item) => item.title),
  }));
};

const CurrentlyWidget = ({ items }) => {
  return (
    <Widget
      label="Currently"
      items={groupItems(items).map((i) => ({
        left: i.verb,
        right: (
          <div className="flex-1 flex flex-col">
            {i.titles.map((subitem) => (
              <div className="font-bold flex-1 text-right" key={subitem}>
                {subitem}
              </div>
            ))}
          </div>
        ),
      }))}
    />
  );
};

export default CurrentlyWidget;
