import Widget from "./Widget";

const CURRENT_ITEMS = [
  {
    type: "Reading",
    catalog: "books",
    items: ["Middlemarch", "LaserWriter II"],
  },
  {
    type: "Watching",
    catalog: "television",
    items: ["Tokyo Vice", "Legend of the Galactic Heroes", "Spy x Family"],
  },
  {
    type: "Playing",
    catalog: "games",
    items: ["Crystal Project"],
  },
];

const CurrentlyWidget = () => {
  return (
    <Widget
      label="Currently"
      items={CURRENT_ITEMS.map((i) => ({
        left: i.type,
        right: (
          <div className="flex flex-col">
            {i.items.map((subitem) => (
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
