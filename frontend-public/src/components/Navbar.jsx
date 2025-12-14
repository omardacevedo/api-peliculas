// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isUserAuthenticated, isAdminUser, logoutUser } from '../utils/auth';

const Navbar = () => {
    const isAuthenticated = isUserAuthenticated();
    const isAdmin = isAdminUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(navigate); // Llama a la función de logout
    };

    return (
        <header className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-purple-800 to-pink-600 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo/Título principal */}
                <div className="text-white">
                    <Link to="/" className="text-xl font-bold">CineUni</Link>
                    <p className="text-xs opacity-80">Películas y series académicas</p>
                </div>

                {/* Enlaces de Navegación */}
                <nav className="flex space-x-6">
                    {/* ENLACES DE ADMINISTRACIÓN (Solo si es Admin) */}
                    {isAdmin && (
                        <>
                            <Link to="/" className="text-white hover:text-yellow-300 transition duration-300">Inicio</Link>
                            <Link to="/admin/generos" className="text-white hover:text-yellow-300 transition duration-300">Administrar Géneros</Link>
                            <Link to="/admin/directores" className="text-white hover:text-yellow-300 transition duration-300">Administrar Directores</Link>
                            <Link to="/admin/productoras" className="text-white hover:text-yellow-300 transition duration-300">Administrar Productoras</Link>
                            <Link to="/admin/tipos" className="text-white hover:text-yellow-300 transition duration-300">Administrar Tipos</Link>
                            <Link to="/admin/medias" className="text-white hover:text-yellow-300 transition duration-300">Administrar Películas</Link>
                        </>
                    )}

                    {/* ENLACE CONDICIONAL DE LOGIN/LOGOUT */}
                    {!isAuthenticated ? (
                        // 🎯 ESTA ES LA RUTA QUE DEBE SER VISIBLE CUANDO NO HAY USUARIO
                        <Link 
                            to="/login" 
                            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition duration-300"
                        >
                            Iniciar Sesión
                        </Link>
                    ) : (
                        // BOTÓN DE LOGOUT (Si hay usuario, sea Admin o no)
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition duration-300"
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;