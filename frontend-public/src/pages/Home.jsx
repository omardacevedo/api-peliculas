// Home.jsx
import { useEffect, useState } from "react";
import { getMedias } from "../api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // 🎯 Nuevo estado para manejo de UX
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga de películas
  const loadMovies = async () => {
    setIsLoading(true); // Iniciar carga
    setError(null);    // Limpiar errores previos

    try {
      const data = await getMedias();
      
      // 🎯 Asignar nombres para campos relacionados para la visualización en la tarjeta (si es necesario)
      const formattedData = data.map(movie => ({
        ...movie,
        generoNombre: movie.genero?.nombre || 'N/A',
        directorNombre: movie.director?.nombre || 'N/A',
        // Agregar otros nombres relacionados si los usas en MovieCard
      }));

      setMovies(formattedData);
      setFilteredMovies(formattedData);
    } catch (err) {
      console.error("Error cargando películas:", err);
      setError("No se pudieron cargar las películas. Por favor, intente de nuevo más tarde.");
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Función de búsqueda
  const handleSearch = (q) => {
    const term = (q || "").toLowerCase();

    if (!term) {
      setFilteredMovies(movies);
      return;
    }

    const results = movies.filter(
      (movie) =>
        // 🎯 Buscar por título
        movie?.titulo?.toLowerCase().includes(term) ||
        // 🎯 Opcional: Buscar también por sinopsis, género, o director (si están formateados)
        movie?.sipnosis?.toLowerCase().includes(term) ||
        movie?.generoNombre?.toLowerCase().includes(term) ||
        movie?.directorNombre?.toLowerCase().includes(term)
    );

    setFilteredMovies(results);
  };

  // --- Renderizado Condicional de Contenido ---
  
  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white p-6">
        <p className="text-xl">Cargando películas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen p-6 text-red-400">
        <h1 className="text-2xl font-bold mb-4">Módulos de CineUni</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Películas y Series Disponibles</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Mensaje de "No se encontraron resultados" */}
      {filteredMovies.length === 0 && (
        <div className="p-6 text-white text-center">
          <p className="text-xl">No se encontraron resultados para tu búsqueda.</p>
        </div>
      )}

      {/* Grid de Películas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;