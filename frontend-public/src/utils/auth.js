// src/utils/auth.js
// Asumiendo que ya tienes instalado e importado jwt-decode

import { jwtDecode } from 'jwt-decode'; 

// --- CLAVES DE LOCAL STORAGE SEGÚN TU IMPLEMENTACIÓN ---
const TOKEN_KEY = 'userToken';
const ROL_KEY = 'userRole';

// Función para obtener el rol del usuario (ya la tenías)
export const getUserRole = () => {
    return localStorage.getItem(ROL_KEY);
};

// Función para verificar si es administrador (ya la tenías)
export const isAdminUser = () => {
    return getUserRole() === 'administrador' && isUserAuthenticated();
};

// función de ayuda para obtener el token (ya la tenías)
export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// --- NUEVA/CORREGIDA: Verifica si hay un token válido y no ha expirado ---
export const isUserAuthenticated = () => {
    const token = getAuthToken(); // Usando tu función de ayuda
    if (!token) {
        return false;
    }
    try {
        const decoded = jwtDecode(token);
        // Verifica si el token no ha expirado (exp es en segundos, Date.now() en milisegundos)
        if (decoded.exp * 1000 < Date.now()) {
            logoutUser(); // Si expira, lo eliminamos
            return false;
        }
        return true;
    } catch (error) {
        // Si hay un error al decodificar (token inválido), lo tratamos como no autenticado
        console.error("Token inválido o error al decodificar:", error);
        logoutUser();
        return false;
    }
};

// --- CORREGIDA: Guarda la data al iniciar sesión ---
export const saveAuthData = (token, rol) => {
    // IMPORTANTE: Asegúrate de que las claves de almacenamiento coincidan con tus getters
    localStorage.setItem(TOKEN_KEY, token); 
    localStorage.setItem(ROL_KEY, rol);
};

// --- CORREGIDA: Cierra la sesión y limpia el almacenamiento ---
export const logoutUser = (navigate) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROL_KEY);
    
    // Redirección para asegurar que el Navbar se actualice
    if (navigate) {
        navigate('/login');
    } else {
        // En caso de llamarse fuera de un componente (ej. token expirado)
        window.location.href = '/login'; 
    }
};