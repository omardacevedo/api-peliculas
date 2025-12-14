import React, { useEffect, useState } from "react";
import { getTipos, createTipo, updateTipo, deleteTipo } from "../../api";
import TableList from "../../components/crud/TableList";
import ModalForm from "../../components/crud/ModalForm";
// 🎯 1. Importar la utilidad de rol
import { isAdminUser } from "../../utils/auth";

const TipoList = () => {
    const [tipos, setTipos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    // 🎯 2. Obtener el estado del rol
    const isAdmin = isAdminUser();

    const loadData = async () => {
        const data = await getTipos();
        setTipos(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleEdit = (item) => {
        setCurrent(item);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteTipo(id);
        loadData();
    };

    const handleSubmit = async (data) => {
        if (current?._id) {
            await updateTipo(current._id, data);
        } else {
            await createTipo(data);
        }
        setModalVisible(false);
        setCurrent(null);
        loadData();
    };

    const fields = [
        { name: "nombre", label: "Nombre" },
        { name: "descripcion", label: "Descripción" },
        {
            name: "categoria",
            label: "Categoría",
            type: "select",
            options: [
                { value: "Serie", label: "Serie" },
                { value: "Película", label: "Película" },
            ]
        },
        {
            name: "estado",
            label: "Estado",
            type: "select",
            options: [
                { value: "Activo", label: "Activo" },
                { value: "Inactivo", label: "Inactivo" }
            ]
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Módulo Tipos</h1>
            
            {/* 🎯 3. Renderizado Condicional del Botón Agregar Tipo */}
            {isAdmin && (
                <button 
                    className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600" 
                    onClick={() => setModalVisible(true)}>
                    Agregar Tipo
                </button>
            )}
            
            {/* 🎯 4. Pasar la prop isAdmin al componente TableList */}
            <TableList
                columns={[
                    { label: "Nombre", key: "nombre" },
                    { label: "Descripción", key: "descripcion" },
                    { label: "Categoría", key: "categoria" },
                    { label: "Estado", key: "estado" }
                ]}
                data={tipos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin} // ¡NUEVO!
            />
            <ModalForm visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                initialData={current}
                fields={fields}
            />
        </div>
    );
};

export default TipoList;