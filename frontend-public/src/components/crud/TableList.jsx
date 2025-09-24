import React from "react";

const TableList = ({ columns, data, onEdit, onDelete }) => {
    return (
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-900">
                <tr>
                    {columns.map((col) => (
                        <th key={col.key || col} className="px-4 py-2">{col.label || col}</th>
                    ))}
                    <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {columns.map((col) => (
                            <td key={col.key || col} className="px-4 py-2">{item[col.key || col]}</td>
                        ))}
                        <td className="px-4 py-2 flex gap-2">
                            <button className="bg-yellow-500 px-2 rounded hover:bg-yellow-600" onClick={() => onEdit(item)}>Editar</button>
                            <button className="bg-red-500 px-2 rounded hover:bg-red-600" onClick={() => onDelete(item._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableList;
