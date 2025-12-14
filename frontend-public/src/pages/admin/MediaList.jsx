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
import { isAdminUser } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';

const MediaList = () => {
    const [medias, setMedias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentMedia, setCurrentMedia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = isAdminUser();
    const navigate = useNavigate();

    //Función para cargar todos los datos necesarios
    const loadData = async () => {
        setIsLoading(true);
        try {
            // Cargar Media (principal) y todas las listas relacionadas
            const [
                mediasData,
                generosData,
                directoresData,
                productorasData,
                tiposData
            ] = await Promise.all([
                getMedias(),
                getGeneros(),
                getDirectores(),
                getProductoras(),
                getTipos()
            ]);

            setMedias(mediasData);
            setGeneros(generosData);
            setDirectores(directoresData);
            setProductoras(productorasData);
            setTipos(tiposData);

        } catch (error) {
            console.error("Error al cargar datos:", error);
            // Manejar error (e.g., mostrar una alerta)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Bloqueo de acceso si no es administrador 
        if (!isAdmin) {
            navigate('/');
            return;
        }
        loadData();
    }, [isAdmin, navigate]);

    // --- Handlers de CRUD ---

    const handleEdit = (item) => {
        // Al editar, el objeto Media puede tener las referencias como objetos completos o solo IDs.
        // Aquí pasamos el objeto completo para que el modal pueda inicializarse.
        setCurrentMedia(item);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar esta media?")) {
            await deleteMedia(id);
            loadData();
        }
    };

    const handleSubmit = async (data) => {
        // ESTA FUNCIÓN SERÁ COMPLEJA: NECESITA MANEJAR FormData para la imagen.
        console.log("Datos a enviar:", data);

        // Aquí debes crear un objeto FormData que incluya la imagen
        const formData = new FormData();

        // 1. Añadir campos de texto/ID al FormData
        for (const key in data) {
            if (data[key] !== null && data[key] !== undefined) {
                // Si el campo es una referencia (como director, genero, etc.) o un campo de texto
                formData.append(key, data[key]);
            }
        }

        // 2. Manejar la imagen (si es un objeto File, no una URL)
        // ASUMIMOS QUE EN 'data.imagen' VIENE EL OBJETO File SI ES NUEVO.
        if (data.imagen instanceof File) {
            formData.append('imagen', data.imagen);
        } else if (typeof data.imagen === 'string' && data.imagen.startsWith('http')) {
            // Si es una URL, significa que es la imagen existente (en edición), 
            // no necesitamos enviarla como archivo si no se cambió. 
            // Nota: Algunos backends pueden requerir enviar la URL de nuevo.
        }

        try {
            if (currentMedia?._id) {
                // Actualización: Usaremos el ID
                await updateMedia(currentMedia._id, formData);
            } else {
                // Creación
                await createMedia(formData);
            }
        } catch (error) {
            console.error("Error en la operación de Media:", error);
        }

        setModalVisible(false);
        setCurrentMedia(null);
        loadData();
    };


    // --- Configuración de Campos para ModalForm ---

    // Función auxiliar para mapear listas a opciones de ModalForm
    const mapToOptions = (list) => list.map(item => ({
        value: item._id, // El valor es el ID de la referencia
        label: item.nombre || item.categoria // El label es el nombre o categoría (para Tipos)
    }));

    const fields = [
        { name: "serial", label: "Serial", type: "text", required: true },
        { name: "titulo", label: "Título", type: "text", required: true },
        { name: "sipnosis", label: "Sipnosis", type: "textarea", required: true },
        { name: "url", label: "URL de la Película/Serie", type: "text", required: true },
        {
            name: "imagen",
            label: "Poster (URL o Archivo)",
            type: "file", // Importante: Este campo debe ser tipo 'file'
            required: !currentMedia
        },
        {
            name: "anioEstreno",
            label: "Año de Estreno",
            type: "number",
            required: true
        },
        {
            name: "genero",
            label: "Género",
            type: "select",
            options: mapToOptions(generos),
            required: true
        },
        {
            name: "director",
            label: "Director",
            type: "select",
            options: mapToOptions(directores),
            required: true
        },
        {
            name: "productora",
            label: "Productora",
            type: "select",
            options: mapToOptions(productoras),
            required: true
        },
        {
            name: "tipo",
            label: "Tipo",
            type: "select",
            options: mapToOptions(tipos),
            required: true
        },
        {
            name: "estado",
            label: "Estado",
            type: "select",
            options: [
                { value: "Activo", label: "Activo" },
                { value: "Inactivo", label: "Inactivo" }
            ],
            required: true
        },
    ];

    if (isLoading) {
        return <div className="p-6 text-white bg-gray-900 min-h-screen">Cargando datos de media y referencias...</div>;
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4">Módulo Películas y Series (Media)</h1>

            {isAdmin && (
                <button
                    className="bg-yellow-500 px-4 py-2 rounded mb-4 hover:bg-yellow-600 text-gray-900"
                    onClick={() => {
                        setCurrentMedia(null);
                        setModalVisible(true);
                    }}>
                    Agregar Media
                </button>
            )}

            <TableList
                columns={[
                    { label: "Título", key: "titulo" },
                    { label: "Año", key: "anioEstreno" },
                    { label: "Género", key: "genero" },
                    { label: "Director", key: "director" },
                    { label: "Estado", key: "estado" },
                ]}
                data={medias}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                initialData={currentMedia}
                fields={fields}
                title={currentMedia ? "Editar Media" : "Crear Media"}
            />
        </div>
    );
};

export default MediaList;