import React from "react";

//Importar la funcion de verificar el rol
import { isAdminUser } from "../../utils/auth";

const TableList = ({ columns, data, onEdit, onDelete }) => {

    //Obtener el estado del rol
    const isAdmin = isAdminUser();
    return (
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-900">
                <tr>
                    {columns.map((col) => (
                        <th key={col.key || col} className="px-4 py-2">{col.label || col}</th>
                    ))}

                    {/*Ocultar el encabezado de acciones si no es administrador*/}
                    {isAdmin &&<th className="px-4 py-2">Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {columns.map((col) => (
                            <td key={col.key || col} className="px-4 py-2">{item[col.key || col]}</td>
                        ))}
                        {/*Ocultar opciones si no es administrador*/}
                        {isAdmin &&(
                        <td className="px-4 py-2 flex gap-2">
                            <button className="bg-yellow-500 px-2 rounded hover:bg-yellow-600" onClick={() => onEdit(item)}>Editar</button>
                            <button className="bg-red-500 px-2 rounded hover:bg-red-600" onClick={() => onDelete(item._id)}>Eliminar</button>
                        </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableList;
