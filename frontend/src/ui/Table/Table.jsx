import React from 'react';
import './Table.css';

const Table = ({ title, columns, data, onRowClick }) => {
    return (
        <div>
            {title ? <h3>{title}</h3> : null}
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.field}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'} onClick={() => onRowClick ? onRowClick(row) : null}>
                            {columns.map((column, index) => (
                                <td key={index}>{row[column.field] === true ? "+" : row[column.field] === false ? '-' : row[column.field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table