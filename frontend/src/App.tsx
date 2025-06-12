// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/form_registro";
import Layout from "./components/layout";
import PrivateRoute from '../src/components/private_routes';
import LoginForm from '../src/pages/login';
import { SearchBar } from "./components/searchBar";
import AccesoDenegado from "./pages/acceso_denegado"; 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/movie" element={<PrivateRoute><SearchBar/></PrivateRoute>} />
        <Route path="/acceso-denegado" element={<AccesoDenegado />} /> 
      </Routes>
    </BrowserRouter>
  );
}
