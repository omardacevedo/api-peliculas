import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="text-white p-6">Cargando...</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col md:flex-row gap-6">
      {movie.poster_url && (
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />
      )}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="mb-4">{movie.description || "Sin descripción disponible."}</p>
        <p><strong>Año:</strong> {movie.year || "Desconocido"}</p>
        <p><strong>Duración:</strong> {movie.duration || "Desconocida"}</p>
        <p><strong>Género:</strong> {movie.genre || "No definido"}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
