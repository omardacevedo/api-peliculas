import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//  Importar la función API 
import { getMediaById } from "../api"; 

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); // Añadir manejo de errores

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        // Llamar a la función API para obtener una media por ID
        const data = await getMediaById(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la media:", err);
        setError("Error al cargar los detalles de la media.");
      }
    };
    
    fetchMovie();
  }, [id]);

  if (error) return <p className="text-white p-6 text-red-500">Error: {error}</p>;
  if (!movie) return <p className="text-white p-6">Cargando...</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col md:flex-row gap-6">
      
      {movie.imagen && (
        <img
          src={movie.imagen} 
          alt={movie.titulo} 
          className="w-full md:w-64 rounded-lg shadow-lg object-cover"
        />
      )}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4">{movie.titulo}</h1>
        <p className="mb-4">{movie.sipnosis || "Sin sipnosis disponible."}</p>
        
        <p><strong>Año de Estreno:</strong> {movie.anioEstreno || "Desconocido"}</p>
        <p><strong>Serial:</strong> {movie.serial || "Desconocido"}</p>
        
        {/* 🎯 Mostrar el nombre de la relación (asumiendo que el backend hace populate) */}
        <p><strong>Género:</strong> {movie.genero?.nombre || "No definido"}</p>
        <p><strong>Director:</strong> {movie.director?.nombre || "No definido"}</p>
        <p><strong>Tipo:</strong> {movie.tipo?.categoria || "No definido"}</p>
        <p><strong>Productora:</strong> {movie.productora?.nombre || "No definida"}</p>
      </div>

    </div>
  );
};

export default MovieDetail;