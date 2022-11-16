function ActionLogTableRows({ rows, index }) {

    const { DeviceID = 0, Name = '', Action = '', createdAt } = rows || {}
    return (
        <tr key={index}>
            <td>{DeviceID}</td>
            <td>{Name}</td>
            <td>{Action}</td>
            <td>{createdAt}</td>
        </tr>
    );
}

export default ActionLogTableRows;