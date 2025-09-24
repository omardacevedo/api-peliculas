import React, { useEffect, useState } from "react";
import { getProductoras, createProductora, updateProductora, deleteProductora } from "../../api";
import TableList from "../../components/crud/TableList";
import ModalForm from "../../components/crud/ModalForm";

const ProductoraList = () => {
    const [productoras, setProductoras] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    const loadData = async () => {
        const data = await getProductoras();
        setProductoras(data);
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
        await deleteProductora(id._id || id);
        loadData();
    };

    const handleSubmit = async (data) => {
        const payload = {
            ...data,
            estado: data.estado || "Activo"
        };
        console.log("Payload a enviar:", payload);
        if (current?._id) {
            await updateProductora(current._id, payload);
        } else {
            await createProductora(payload);
        }

        setModalVisible(false);
        setCurrent(null);
        loadData();
    };

    const fields = [
        { name: "nombre", label: "Nombre" },
        { name: "slogan", label: "Slogan" },
        { name: "descripcion", label: "Descripción" },
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
            <h1 className="text-2xl font-bold mb-4">Módulo Productora</h1>
            <button
                className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600"
                onClick={() => {
                    setCurrent({
                        nombre: "",
                        slogan: "",
                        descripcion: "",
                        estado: "Activo"
                    });
                    setModalVisible(true);
                }}
            >
                Agregar Productora
            </button>
            <TableList
                columns={[
                    { label: "Nombre", key: "nombre" },
                    { label: "Slogan", key: "slogan" },
                    { label: "Descripcion", key: "descripcion" },
                    { label: "Estado", key: "estado" }
                ]}
                data={productoras}
                onEdit={handleEdit}
                onDelete={handleDelete}
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

export default ProductoraList;
