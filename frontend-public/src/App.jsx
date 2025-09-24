import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

//MODULOS CRUD CREADOS

import GeneroList from "./pages/admin/GeneroList";
import DirectorList from "./pages/admin/DirectorList";
import ProductoraList from "./pages/admin/ProductoraList";
import TipoList from "./pages/admin/TipoList";
import MediaList from "./pages/admin/MediaList";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/admin/generos" element={<GeneroList />} />
      <Route path="/admin/directores" element={<DirectorList />} />
      <Route path="/admin/productoras" element={<ProductoraList />} />
      <Route path="/admin/tipos" element={<TipoList />} />
      <Route path="/admin/media" element={<MediaList />} />

    </Routes>
  </Router>
);

export default App;
