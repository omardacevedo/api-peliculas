import React, { useEffect, useState } from "react";
import {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia,
    getGeneros,
    getDirectores,
    getProductoras,
    getTipos
} from "../../api";
import TableList from "../../components/crud/TableList";
import ModalForm from "../../components/crud/ModalForm";

const MediaList = () => {
    const [medias, setMedias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    // Para selects relacionados
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const loadData = async () => {
        console.log(await getProductoras())
        setMedias(await getMedias());
        setGeneros(await getGeneros());
        setDirectores(await getDirectores());
        setProductoras(await getProductoras());
        setTipos(await getTipos());
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = () => {
        setCurrent(null);
        setModalVisible(true);
    };

    const handleEdit = (item) => {
        setCurrent({
            ...item,
            genero: item.genero?._id || "",
            director: item.director?._id || "",
            productora: item.productora?._id || "",
            tipo: item.tipo?._id || ""
        });
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteMedia(id);
        loadData();
    };

    const handleSubmit = async (data) => {
        if (current) {
            await updateMedia(current._id, data);
        } else {
            await createMedia(data);
        }
        setModalVisible(false);
        setCurrent(null);
        loadData();
    };

    const fields = [
        { name: "serial", label: "Serial" },
        { name: "titulo", label: "Título" },
        { name: "sipnosis", label: "Sinopsis" },
        { name: "url", label: "URL de la Película" },
        { name: "imagen", label: "Imagen/Portada" },
        { name: "anioEstreno", label: "Año de Estreno", type: "number" },
        { name: "genero", label: "Género", type: "select", options: generos.map(g => ({ value: g._id, label: g.nombre })) },
        { name: "director", label: "Director", type: "select", options: directores.map(d => ({ value: d._id, label: d.nombre })) },
        { name: "productora", label: "Productora", type: "select", options: productoras.map(p => ({ value: p._id, label: p.nombre })) },
        {
            name: "tipo",
            label: "Tipo",
            type: "select",
            options: tipos.map(t => ({
                value: t._id,
                label: `${t.categoria}`
            }))
        }]

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Módulo Media (Películas/Series)</h1>
            <button
                className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600"
                onClick={handleAdd}
            >
                Agregar Media
            </button>
            <div className="overflow-x-auto">
                <TableList
                    columns={[
                        { label: "Serial", key: "serial" },
                        { label: "Título", key: "titulo" },
                        { label: "Sinopsis", key: "sipnosis" },
                        { label: "URL de la Película", key: "url" },
                        { label: "Imagen/Portada", key: "imagen" },
                        { label: "Año de Estreno", key: "anioEstreno" },
                        { label: "Género", key: "generoNombre" },
                        { label: "Director", key: "directorNombre" },
                        { label: "Productora", key: "productoraNombre" },
                        { label: "Tipo", key: "tipoNombre" },
                    ]}
                    data={medias}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
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

export default MediaList;
