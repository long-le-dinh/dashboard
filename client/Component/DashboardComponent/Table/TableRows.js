function TableRows({rows, index}) {
    const { _id = '',name = '', mac = '', ip = '', date = '', pc = 0 } = rows || {}
    return (
        <tr key={index}>
            <td>{name}</td>
            <td>{mac}</td>
            <td>{ip}</td>
            <td>{date}</td>
            <td>{pc}</td>
        </tr>
    );
}

export default TableRows;