// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAuthData } from '../utils/auth'; 
import { login } from '../api'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            // 1. Llamar a la API de Login
            const response = await login(email, password); 
            
            // 2. Verificar que la respuesta contiene el token y el rol
            if (response && response.token && response.rol) {
                
                // 3. Guardar la información de autenticación
                saveAuthData(response.token, response.rol); 
                
                // 4. Redirigir al usuario (ej. a la página de inicio)
                navigate('/');
                
                // 5. Opcional: Recargar la página para asegurar la actualización del Navbar
                window.location.reload(); 
            } else {
                setError('Respuesta inesperada del servidor: Faltan token o rol.');
            }
        } catch (err) {
            // 🎯 CORRECCIÓN: Capturar el mensaje directamente del objeto Error lanzado por api.js
            const errorMessage = err.message || 'Credenciales incorrectas. Verifique la conexión al servidor.';
            setError(errorMessage);
            console.error("Fallo de Login:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="p-8 rounded-xl shadow-2xl bg-gray-800 border border-gray-700 w-full max-w-sm">
                <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
                    🔑 Iniciar Sesión en CineUni
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>
                    
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center font-semibold">
                            {error}
                        </p>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition duration-300 focus:outline-none focus:shadow-outline"
                    >
                        Acceder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;