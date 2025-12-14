
const BASE_URL = "http://localhost:3000/api"; //
// ------------------------------------------------------------------
//                     UTILIDADES GENERALES
// ------------------------------------------------------------------

const getAuthToken = () => {
    return localStorage.getItem('userToken');
};

/**
 * Función de utilidad para manejar peticiones Fetch con JSON, incluyendo autenticación.
 * @param {string} url - URL del endpoint.
 * @param {object} options - Opciones de la petición (method, headers, body).
 */
const apiCall = async (url, options = {}) => {
    const token = getAuthToken();
    
    // Configuración de Headers: Content-Type y Authorization (si hay token)
    const headers = { 
        "Content-Type": "application/json", 
        ...(token && { "Authorization": `Bearer ${token}` }), // Añadir el token si existe
        ...options.headers 
    };
    
    // Configuración final de la petición (incluyendo el método y cuerpo si existen)
    const finalOptions = { 
        ...options, 
        headers: headers,
        // No incluir 'body' si no se proporciona para evitar errores en peticiones GET/DELETE
        ...(options.body && { body: options.body }) 
    };

    try {
        // 🎯 PASO CRUCIAL: Ejecutar el fetch
        const res = await fetch(url, finalOptions); 
        
        if (res.status === 204 || finalOptions.method === 'DELETE') {
            return null; // No Content o borrado exitoso
        }
        
        const data = await res.json();
        
        if (!res.ok) {
            // Lanzar error con el mensaje del backend
            throw new Error(data.mensaje || data.message || `Error en la petición: ${res.status}`);
        }
        
        return data;
    } catch (error) {
        console.error(`Error en la llamada a la API (${url}):`, error.message);
        throw error; // Re-lanzar para que el componente lo maneje
    }
};

/**
 * Función especial para manejar peticiones Fetch con FormData (archivos).
 * No establece Content-Type, ya que el navegador lo hace por FormData.
 */
const apiCallFormData = async (url, options = {}) => {
    const token = getAuthToken(); 
    
    // Configuración de Headers: Solo añadir Authorization
    const headers = { 
        ...(token && { "Authorization": `Bearer ${token}` }), 
        ...options.headers 
    };

    const finalOptions = { ...options, headers: headers };

    try {
        const res = await fetch(url, finalOptions);
        
        if (res.status === 204 || finalOptions.method === 'DELETE') {
            return null;
        }
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.mensaje || data.message || `Error con archivo: ${res.status}`);
        }
        
        return data;
    } catch (error) {
        console.error(`Error en la llamada a la API con FormData (${url}):`, error.message);
        throw error; 
    }
};

// ------------------------------------------------------------------
//                               AUTENTICACIÓN
// ------------------------------------------------------------------

/**
 * Inicia sesión con email y password. No usa apiCall porque no necesita el token.
 */
export const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMessage = data.mensaje || data.message || "Credenciales incorrectas."; 
        throw new Error(errorMessage);
    }

    return data; // Devuelve { token: "...", rol: "administrador" | "visualizador" }
};


// ------------------------------------------------------------------
//                              CRUD GENERO
// ------------------------------------------------------------------
// **Usan apiCall, que añade el header 'Authorization' automáticamente**

export const getGeneros = async () => apiCall(`${BASE_URL}/generos`);
export const getGeneroById = async (id) => apiCall(`${BASE_URL}/generos/${id}`);
export const createGenero = async (data) => apiCall(`${BASE_URL}/generos`, { method: "POST", body: JSON.stringify(data) });
export const updateGenero = async (id, data) => apiCall(`${BASE_URL}/generos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteGenero = async (id) => apiCall(`${BASE_URL}/generos/${id}`, { method: "DELETE" });


// ------------------------------------------------------------------
//                              CRUD DIRECTOR
// ------------------------------------------------------------------

export const getDirectores = async () => apiCall(`${BASE_URL}/directores`);
export const getDirectorById = async (id) => apiCall(`${BASE_URL}/directores/${id}`);
export const createDirector = async (data) => apiCall(`${BASE_URL}/directores`, { method: "POST", body: JSON.stringify(data) });
export const updateDirector = async (id, data) => apiCall(`${BASE_URL}/directores/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteDirector = async (id) => apiCall(`${BASE_URL}/directores/${id}`, { method: "DELETE" });


// ------------------------------------------------------------------
//                              CRUD PRODUCTORA
// ------------------------------------------------------------------

export const getProductoras = async () => apiCall(`${BASE_URL}/productoras`);
export const getProductoraById = async (id) => apiCall(`${BASE_URL}/productoras/${id}`);
export const createProductora = async (data) => apiCall(`${BASE_URL}/productoras`, { method: "POST", body: JSON.stringify(data) });
export const updateProductora = async (id, data) => apiCall(`${BASE_URL}/productoras/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProductora = async (id) => apiCall(`${BASE_URL}/productoras/${id}`, { method: "DELETE" });


// ------------------------------------------------------------------
//                               CRUD TIPO
// ------------------------------------------------------------------

export const getTipos = async () => apiCall(`${BASE_URL}/tipos`);
export const getTipoById = async (id) => apiCall(`${BASE_URL}/tipos/${id}`);
export const createTipo = async (data) => apiCall(`${BASE_URL}/tipos`, { method: "POST", body: JSON.stringify(data) });
export const updateTipo = async (id, data) => apiCall(`${BASE_URL}/tipos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTipo = async (id) => apiCall(`${BASE_URL}/tipos/${id}`, { method: "DELETE" });


// ------------------------------------------------------------------
//                               CRUD MEDIA
// ------------------------------------------------------------------

export const getMedias = async () => apiCall(`${BASE_URL}/medias`);
export const getMediaById = async (id) => apiCall(`${BASE_URL}/medias/${id}`);
export const createMedia = async (data) => apiCallFormData(`${BASE_URL}/medias`, { method: "POST", body: data });
export const updateMedia = async (id, data) => apiCallFormData(`${BASE_URL}/medias/${id}`, { method: "PUT", body: data });
export const deleteMedia = async (id) => apiCall(`${BASE_URL}/medias/${id}`, { method: "DELETE" });