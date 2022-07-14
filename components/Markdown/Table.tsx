const Table = ({ children }) => {
  return (
    <table className="my-4 lg:my-8 w-full">
      <thead>
        <tr className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm">
          {children[0].props.children.props.children.map((th) => (
            <th className="py-2 px-4" key={th}>
              {th.props.children}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="py-2 bg-subtle rounded-b-lg border-b border-x border-subtler rounded-lg">
        {children[1].props.children.map((tr) => (
          <tr key={tr} className="group">
            {tr.props.children.map((td) => (
              <td
                className="px-4 py-2 group-first:pt-4 group-last:pb-4"
                key={td}
              >
                {td.props.children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
