// src/utils/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import Media from "../models/Media.js";
import Genero from "../models/Genero.js";
import Director from "../models/Director.js";
import Productora from "../models/Productora.js";
import Tipo from "../models/Tipo.js";

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Función para crear documento si no existe
    const findOrCreate = async (Model, query) => {
      let doc = await Model.findOne(query);
      if (!doc) {
        doc = await Model.create(query);
      }
      return doc;
    };

    // Crear géneros
    const genero1 = await findOrCreate(Genero, { nombre: "Acción" });
    const genero2 = await findOrCreate(Genero, { nombre: "Suspenso" });

    // Crear directores
    const director1 = await findOrCreate(Director, { nombre: "Quentin_Tarantino" });
    const director2 = await findOrCreate(Director, { nombre: "Christopher_Nolan" });

    // Crear productoras
    const productora1 = await Productora.create({ nombre: "Miramax", descripcion: "Productora de cine estadounidense" });
    const productora2 = await Productora.create({ nombre: "Warner_Bros", descripcion: "Productora de cine internacional" });

    // Crear tipos
    const tipo1 = await findOrCreate(Tipo, { nombre: "Película", categoria: "Película", estado: "Activo" });
    const tipo2 = await findOrCreate(Tipo, { nombre: "Serie", categoria: "Serie", estado: "Activo" });

    // Crear medias/películas si no existen
    const mediasData = [
      {
        serial: "AVENGERS2012",
        titulo: "Avengers",
        sipnosis: "Un grupo de superhéroes se une para salvar el mundo.",
        url: "https://www.imdb.com/title/tt0848228/",
        imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fmarvel-superhero-movie-avengers-3p49xboy2uzn0w1t.jpg&f=1&nofb=1",
        anioEstreno: 2012,
        genero: genero1._id,
        director: director1._id,
        productora: productora1._id,
        tipo: tipo1._id
      },
      {
        serial: "INCEPTION2010",
        titulo: "Inception",
        sipnosis: "Un ladrón roba secretos a través de los sueños.",
        url: "https://www.imdb.com/title/tt1375666/",
        imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FfWnWpHj.jpg&f=1&nofb=1",
        anioEstreno: 2010,
        genero: genero2._id,
        director: director2._id,
        productora: productora2._id,
        tipo: tipo1._id
      },
      {
        serial: "JOKER2019",
        titulo: "Joker",
        sipnosis: "Un hombre marginal se convierte en un criminal infame.",
        url: "https://www.imdb.com/es/title/tt7286456/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_joker",
        imagen: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        anioEstreno: 2019,
        genero: genero2._id,
        director: director1._id,
        productora: productora2._id,
        tipo: tipo1._id
      }
    ];

    for (const media of mediasData) {
      const exists = await Media.findOne({ url: media.url });
      if (!exists) {
        await Media.create(media);
      }
    }

    console.log("🎬 Datos de prueba insertados o ya existentes");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
