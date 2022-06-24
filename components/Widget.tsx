const Widget = ({ label, items }) => {
  return (
    <div className="my-8">
      <div className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm py-2 px-4">
        {label}
      </div>
      <div className="py-2 bg-subtle rounded-b-lg border-b border-x border-subtler">
        {items.map((item) => (
          <div
            key={item.type}
            className="flex bg-subtle hover:bg-subtlest hover:py-2 hover:-my-2 px-4 border-solid"
          >
            <div className="text-gray-500">{item.left}</div>
            {item.right}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;