import React, { useState, useEffect } from "react";

const ModalForm = ({ visible, onClose, onSubmit, initialData, fields }) => {
    const [formData, setFormData] = useState({});

    // Cuando cambie initialData, actualizamos el form
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            const defaultData = {};
            fields.forEach(f => {
                if (f.type === "select") defaultData[f.name] = f.options?.[0]?.value || "";
                else defaultData[f.name] = "";
            });
            setFormData(defaultData);
        }
    }, [initialData,fields]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    {initialData && initialData._id ? "Editar Media" : "Agregar Media"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="mb-1 font-semibold">{field.label}</label>

                            {field.type === "select" ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                >
                                    <option value="">Seleccione una opción</option>
                                    {field.options &&
                                        field.options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
