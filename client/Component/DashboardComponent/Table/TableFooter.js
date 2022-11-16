function TableFooter({ total = 0, colspan=0 }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={colspan}>Total</td>
        <td className="total">{total}</td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
