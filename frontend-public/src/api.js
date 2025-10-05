const BASE_URL = "https://api-peliculas-9wz5.onrender.com/api";




//Genero 

export const getGeneros = async () => {
  const res = await fetch(`${BASE_URL}/generos`);
  return res.json();
};

export const createGenero = async (data) => {
  const res = await fetch(`${BASE_URL}/generos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateGenero = async (id, data) => {
  const res = await fetch(`${BASE_URL}/generos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteGenero = async (id) => {
  await fetch(`${BASE_URL}/generos/${id}`, {
    method: "DELETE"
  });
};

// ---- Director ----

export const getDirectores = async () => fetch(`${BASE_URL}/directores`).then(r => r.json());
export const createDirector = async (data) => fetch(`${BASE_URL}/directores`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const updateDirector = async (id, data) => fetch(`${BASE_URL}/directores/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteDirector = async (id) => fetch(`${BASE_URL}/directores/${id}`, { method: "DELETE" });


// ---- Productora -----
export const getProductoras = async () => fetch(`${BASE_URL}/productoras`).then(r => r.json());
export const createProductora = async (data) => fetch(`${BASE_URL}/productoras`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const updateProductora = async (id, data) => fetch(`${BASE_URL}/productoras/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteProductora = async (id) => fetch(`${BASE_URL}/productoras/${id}`, { method: "DELETE" });

// ----- Tipo -----
export const getTipos = async () => fetch(`${BASE_URL}/tipos`).then(r => r.json());
export const createTipo = async (data) => fetch(`${BASE_URL}/tipos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const updateTipo = async (id, data) => fetch(`${BASE_URL}/tipos/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteTipo = async (id) => fetch(`${BASE_URL}/tipos/${id}`, { method: "DELETE" });

// ----- Media -----
export const getMedias = async () => fetch(`${BASE_URL}/medias`).then(r => r.json());
export const createMedia = async (data) => fetch(`${BASE_URL}/medias`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const updateMedia = async (id, data) => fetch(`${BASE_URL}/medias/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteMedia = async (id) => fetch(`${BASE_URL}/medias/${id}`, { method: "DELETE" });
