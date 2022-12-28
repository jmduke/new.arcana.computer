type Props = {
  label: string;
  items: {
    left: any;
    right?: any;
  }[];
  emphasis?: boolean;
};

const Widget = ({ label, items, emphasis }: Props) => {
  return (
    <div className="my-4 lg:my-8">
      <div
        className={
          (emphasis ? "border-brand bg-brand text-white " : "border-subtler") +
          " rounded-t-lg bg-subtler border-solid border border-b-0 uppercase font-bold text-sm py-2 px-4"
        }
      >
        {label}
      </div>
      <div
        className={
          (emphasis
            ? "border-brand bg-[#dec3c3] text-black"
            : "border-subtler bg-subtle text-gray-500") +
          " py-2  rounded-b-lg border-b border-x"
        }
      >
        {items.map((item) => (
          <div key={item.left} className={"flex px-4 border-solid"}>
            <div>{item.left}</div>
            {item.right}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
