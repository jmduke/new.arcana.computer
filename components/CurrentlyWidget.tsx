import { Item, Type } from "lib/data";

import Widget from "./Widget";

const TYPE_TO_VERB = {
  Book: "Reading",
  Game: "Playing",
  Television: "Watching",
};

const groupItems = (items: Item[]) => {
  const verbToItems: { [verb: string]: Item[] } = {};
  items.map((item) => {
    if (!verbToItems[TYPE_TO_VERB[item.type]]) {
      verbToItems[TYPE_TO_VERB[item.type]] = [];
    }
    verbToItems[TYPE_TO_VERB[item.type]].push(item);
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
