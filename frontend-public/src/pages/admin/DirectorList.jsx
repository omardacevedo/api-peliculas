import React, { useEffect, useState } from "react";
import { getDirectores, createDirector, updateDirector, deleteDirector } from "../../api";
import TableList from "../../components/crud/TableList";
import ModalForm from "../../components/crud/ModalForm";
import { isAdminUser } from "../../utils/auth";

const DirectorList = () => {
    const [directores, setDirectores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    const isAdmin = isAdminUser();


    const loadData = async () => {
        const data = await getDirectores();
        setDirectores(data);
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
        await deleteDirector(id);
        loadData();
    };

    const handleSubmit = async (data) => {
        const payload = {
            ...data,
            estado: data.estado || "Activo"
        };

        if (current?._id) {
            await updateDirector(current._id, payload);
        } else {
            await createDirector(payload);
        }
        setModalVisible(false);
        setCurrent(null);
        loadData();
    };

    const fields = [
        { name: "nombre", label: "Nombre" },
        {
            name: "estado",
            label: "Estado",
            type: "select",
            options: [
                { value: "Activo", label: "Activo" },
                { value: "Inactivo", label: "Inactivo" }
            ]
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Módulo Director</h1>
            {/* ✅ Renderizado condicional para el botón Agregar Director */}
            {isAdmin && (
                <button
                    className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600"
                    onClick={() => {
                        setCurrent(null); // Limpiar datos para la creación
                        setModalVisible(true);
                    }}
                >
                    Agregar Director
                </button>
            )}
            {/* 🎯 CORRECCIÓN CLAVE: Pasar la prop isAdmin al componente TableList */}
            <TableList
                columns={["nombre", "estado"]}
                data={directores}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin} // ¡NUEVO!
            />
            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                initialData={current}
                fields={fields}
            />
        </div>
    );
};

export default DirectorList;