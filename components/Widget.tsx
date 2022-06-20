const Widget = ({ label, items }) => {
  return (
    <div className="my-4">
      <div className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm py-2 px-4">
        {label}
      </div>
      <div className="py-2 bg-subtle rounded-b-lg border-b border-x border-subtler">
        {items.map((item) => (
          <div
            key={item.type}
            className="flex bg-subtle hover:bg-subtler px-4  border-solid"
          >
            <div className="text-gray-500 flex-1">{item.left}</div>
            {item.right}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
