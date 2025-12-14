import Media from "../models/Media.js";

// Crear Media
export const crearMedia = async (req, res) => {
  try {
    const nuevaMedia = new Media(req.body);
    await nuevaMedia.save();
    res.status(201).json(nuevaMedia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las medias (con populate seguro)
export const obtenerMedias = async (req, res) => {
  console.log(req.query); // Ver qué viene
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const search = req.query.search || "";

    const query = search ? { titulo: { $regex: search, $options: "i" } } : {};

    const medias = await Media.find(query)
      .populate("genero", "nombre")
      .populate("director", "nombre")
      .populate("productora", "nombre")
      .populate("tipo", "nombre")
      .skip((page - 1) * limit)
      .limit(limit);

    const mapped = medias.map((media) => ({
      _id: media._id,
      serial: media.serial || "",
      titulo: media.titulo || "",
      sipnosis: media.sipnosis || "",
      url: media.url || "",
      imagen: media.imagen || "",
      anioEstreno: media.anioEstreno || "",
      estado: media.estado || "N/A",
      genero: media.genero?.nombre || "",
      director: media.director?.nombre || "",
      productora: media.productora?.nombre || "",
      tipo: media.tipo?.nombre || "",
      generoNombre: media.genero?.nombre || "No definido",
      directorNombre: media.director?.nombre || "No definido",
      productoraNombre: media.productora?.nombre || "No definido",
      tipoNombre: media.tipo?.nombre || "No definido",
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error obtenerMedias:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener media por ID (con populate seguro)
export const obtenerMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("genero", "nombre")
      .populate("director", "nombre")
      .populate("productora", "nombre")
      .populate("tipo", "nombre");

    if (!media) return res.status(404).json({ error: "Media no encontrada" });

    const mapped = {
      id: media._id,
      title: media.titulo || "Sin título",
      poster_url:
        media.imagen || "https://via.placeholder.com/500x750?text=No+Image",
      description: media.sipnosis || "Sin descripción",
      year: media.anioEstreno || "Desconocido",
      duration: media.duracion || "Desconocida",
      genre: media.genero?.nombre || "No definido",
      director: media.director?.nombre || "No definido",
      productora: media.productora?.nombre || "No definida",
      tipo: media.tipo?.nombre || "No definido",
    };

    res.json(mapped);
  } catch (error) {
    console.error("Error obtenerMedia:", error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar media
export const actualizarMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!media) return res.status(404).json({ error: "Media no encontrada" });
    res.json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar media
export const eliminarMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ error: "Media no encontrada" });
    res.json({ message: "Media eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
