import Icon from "./Icon";

const Tag = ({ value }) => {
  return (
    <div className="rounded-full bg-subtle text-sm inline-block px-3">
      <div className="text-gray-700 flex space-x-2 items-center">
        <div className="text-right flex-1">{value}</div>
        <Icon.Tag />
      </div>
    </div>
  );
};

export default Tag;
