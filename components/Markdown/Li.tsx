const Li = (props) => (
  <li className="text-2xl my-4 list-disc" {...props}>
    {props.children}
  </li>
);

export default Li;
