import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Texto con link a inicio */}
        <Link to="/" className="flex flex-col group">
          <h1 className="text-2xl font-bold tracking-wider group-hover:text-yellow-300 transition">
            CineUni
          </h1>
          <p className="text-sm opacity-80 group-hover:opacity-100 transition">
            Películas y series académicas
          </p>
        </Link>

        {/* Botón móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md hover:bg-white/20 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <div
          className={`${open ? "block" : "hidden"
            } lg:flex lg:space-x-6 absolute lg:static top-16 right-4 lg:top-auto lg:right-auto bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-lg lg:shadow-none`}
        >
          <Link to="/" className="block px-2 py-1 hover:text-yellow-300 transition">
            Inicio
          </Link>
          <Link to="/admin/generos" className="block px-2 py-1 hover:text-yellow-300 transition">
            Administrar Géneros
          </Link>
          <Link to="/admin/directores" className="block px-2 py-1 hover:text-yellow-300 transition">
            Administrar Directores
          </Link>
          <Link to="/admin/productoras" className="block px-2 py-1 hover:text-yellow-300 transition">
            Administrar Productoras
          </Link>
          <Link to="/admin/tipos" className="block px-2 py-1 hover:text-yellow-300 transition">
            Administrar Tipos
          </Link>
          <Link to="/admin/media" className="block px-2 py-1 hover:text-yellow-300 transition">
            Administrar Películas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
