// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/form_registro";
import Layout from "./components/layout";
import PrivateRoute from '../src/components/private_routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/Layout" element={<PrivateRoute><Layout /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
