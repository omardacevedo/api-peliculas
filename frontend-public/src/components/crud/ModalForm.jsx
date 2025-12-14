// src/components/crud/ModalForm.jsx

import React, { useState, useEffect } from 'react';

const ModalForm = ({ visible, onClose, onSubmit, initialData, fields, title }) => {
    const [formData, setFormData] = useState({});
    const [fileData, setFileData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // ... (El useEffect, handleChange, handleFileChange, handleSubmit permanecen IGUAL) ...
    
    useEffect(() => {
        if (visible) {
            const initialForm = {};
            
            if (initialData) {
                fields.forEach(field => {
                    const value = initialData[field.name];
                    
                    if (field.type === 'select' && value && value._id) {
                        initialForm[field.name] = value._id;
                    } else if (field.name === 'imagen' && value) {
                        setPreviewUrl(value);
                        initialForm[field.name] = value; 
                    } else {
                        initialForm[field.name] = value || '';
                    }
                });
            }
            
            setFormData(initialForm);
            setFileData(null); 
        } else {
            setFormData({});
            setFileData(null);
            setPreviewUrl('');
        }
        return () => {
             if (previewUrl && !initialData) URL.revokeObjectURL(previewUrl);
        };
    }, [visible, initialData, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileData(file);
        
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(initialData?.imagen || '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSubmit = { ...formData };
        
        if (fileData) {
            dataToSubmit['imagen'] = fileData;
        } else if (initialData && !initialData.imagen && fields.find(f => f.name === 'imagen' && f.required)) {
             alert('Debe seleccionar un archivo de imagen.');
             return;
        }
        
        onSubmit(dataToSubmit);
    };

    // --- FUNCIÓN AUXILIAR PARA RENDERIZAR CAMPOS (RESUELVE EL ERROR DE PARSING) ---
    const renderField = (field) => {
        const commonProps = {
            name: field.name,
            value: formData[field.name] || '',
            onChange: handleChange,
            className: "w-full text-white bg-gray-700 p-2 rounded border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500",
            required: field.required
        };

        switch (field.type) {
            case 'file':
                return (
                    <>
                        <input
                            type="file"
                            name={field.name}
                            onChange={handleFileChange}
                            className="w-full text-white bg-gray-700 p-2 rounded border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
                            required={field.required && !initialData?.imagen} 
                        />
                        {(previewUrl) && (
                            <p className="text-sm text-gray-400 mt-2">
                                {fileData ? 'Nueva Imagen Seleccionada:' : 'Imagen actual:'}
                                <img src={previewUrl} alt="Preview" className="mt-2 h-24 w-auto object-cover rounded" />
                            </p>
                        )}
                    </>
                );

            case 'select':
                return (
                    <select
                        {...commonProps}
                        value={formData[field.name] || ''}
                    >
                        <option value="" disabled>Seleccione {field.label}</option>
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows="4"
                        value={formData[field.name] || ''}
                    />
                );

            case 'number':
            case 'text':
            default:
                return (
                    <input
                        {...commonProps}
                        type={field.type || 'text'}
                        value={formData[field.name] || ''}
                    />
                );
        }
    };
    // --------------------------------------------------------------------------

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">{title || (initialData ? "Editar" : "Crear")}</h2>
                
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div className="mb-4" key={field.name}>
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            
                            {/* LLAMADA SIMPLIFICADA A LA FUNCIÓN AUXILIAR */}
                            {renderField(field)} 
                            
                        </div>
                    ))}
                    
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition"
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