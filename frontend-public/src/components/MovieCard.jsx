import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const handleRegister = () => {
    registerMovie(movie)
      .then(() => alert("Película registrada"))
      .catch(() => alert("Error al registrar"));
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300">
      <Link to={movie.url || "#"}>
        {movie.imagen ? (
          <img
            src={movie.imagen}
            alt={movie.titulo}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-white">
            Sin imagen
          </div>
        )}
      </Link>
      <div className="p-2 text-white flex flex-col justify-between h-32">
        <h2 className="font-bold text-center text-lg">{movie.titulo}</h2>
        <button
          onClick={handleRegister}
          className="mt-2 bg-green-600 px-3 py-1 rounded w-full hover:bg-green-700 transition"
        >
          Ver mas...
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
