// Home.jsx
import { useEffect, useState } from "react";
import { getMedias } from "../api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Carga de películas
  const loadMovies = async () => {
    try {
      const data = await getMedias();
      console.log("Películas cargadas:", data); // revisar datos
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error("Error cargando películas:", error);
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
        movie?.titulo?.toLowerCase().includes(term)
    );

    setFilteredMovies(results);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="p-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
