const Notice = ({ label, children }) => (
  <div className="bg-subtle rounded-lg py-2 px-4 text-sm flex my-4">
    <div className="font-bold flex-1">{label}</div>
    {children}
  </div>
);

export default Notice;
