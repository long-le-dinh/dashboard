import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

function Table({ columns = [], data = [], CompTableRow , total=0}) {
  const colspan = columns.length -1
  return (
    <table>
      <TableHead>
        {columns.map((item) => (
          <td key={item?.id}>{item.label}</td>
        ))}
      </TableHead>
      <TableBody>
        {data.map((item,idx )=>(
            CompTableRow(item, idx)
        ))}
      </TableBody>
      {total !==0 && <TableFooter total={total} colspan={colspan} />}

    </table>
  );
}

export default Table;
