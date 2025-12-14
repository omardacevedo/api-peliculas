import React, { useEffect, useState } from "react";
import { getGeneros, createGenero, updateGenero, deleteGenero } from "../../api";
import TableList from "../../components/crud/TableList";
import ModalForm from "../../components/crud/ModalForm";

import { isAdminUser } from "../../utils/auth";

const GeneroList = () => {
    const [generos, setGeneros] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    // ✅ Lectura del rol
    const isAdmin = isAdminUser(); 
    
    const loadData = async () => {
        // NOTA: En una aplicación real, getGeneros debería manejar tokens
        const data = await getGeneros();
        setGeneros(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleEdit = (item) => {
        setCurrent({
            ...item,
            estado: item.estado || "Activo"
        });
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteGenero(id._id || id);
        loadData();
    };

    const handleSubmit = async (data) => {
        const payload ={
            ...data,
            estado: data.estado || "Activo"
        };
        if (current?._id) {
            await updateGenero(current._id, payload);
        } else {
            await createGenero(payload);
        }
        setModalVisible(false);
        setCurrent(null);
        loadData();
    };

    const fields = [
        { name: "nombre", label: "Nombre" },
        { name: "descripcion", label: "Descripción" },
        {
            name: "estado",
            label: "Estado",
            type: "select",
            options: [
                {value: "Activo", label:"Activo"},
                {value: "Inactivo", label:"Inactivo"}

            ]
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Módulo Género</h1>
            
            {/* ✅ Condición para el botón "Agregar Género" */}
            {isAdmin &&(
            <button
                className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600"
                onClick={() => {
                    setCurrent({
                        nombre: "",
                        descripcion: "",
                        estado: "Activo" 
                    });
                    setModalVisible(true);
                }}
            >
                Agregar Género
            </button>
            )}
            
            {/* 🎯 CORRECCIÓN CLAVE: Pasar la prop isAdmin al componente TableList */}
            <TableList 
                columns={["nombre", "descripcion", "estado"]} 
                data={generos} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                isAdmin={isAdmin} // ¡NUEVO!
            />
            <ModalForm visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmit} initialData={current} fields={fields} />
        </div>
    );
};

export default GeneroList;