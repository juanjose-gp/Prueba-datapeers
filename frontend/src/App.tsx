// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/form_registro";
import Layout from "./components/layout";
//import PrivateRoute from '../src/components/private_routes';
import LoginForm from '../src/pages/login';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}
