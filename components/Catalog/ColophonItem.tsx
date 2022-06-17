const ColophonItem = ({ icon, value }) => (
  <div className="text-gray-700 flex space-x-2 items-center">
    <div className="text-right flex-1">{value}</div>
    {icon}
  </div>
);

export default ColophonItem;
