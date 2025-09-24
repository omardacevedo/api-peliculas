import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 🔹 filtramos mientras escribimos
  };

  return (
    <div className="flex items-center justify-center my-6">
      <div className="relative w-2/3 sm:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar película..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={query}
          onChange={handleChange} // 🔹 dispara búsqueda al escribir
        />
      </div>
    </div>
  );
};

export default SearchBar;
