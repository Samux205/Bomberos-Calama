import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dubtes from "./pages/Dubtes";
import Inscripcio from "./pages/Inscripcio";
import Solicituds from "./pages/Sollicituds";
import Capacitacions from "./pages/Capacitacions";


function App() {
  return (
    <Router>
      <Routes>
        {/* Entrada principal */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} /> 

        {/*Dudas*/}
        <Route path="/Dubtes" element={<Dubtes/>} />

        {/*Inscripciones*/}
        <Route path="/Inscripcio" element={<Inscripcio/>} />

        {/*Solicitudes*/}
        <Route path="/Solicituds" element={<Solicituds/>} />

        {/*Capacitaciones*/}
        <Route path="/Capacitacions" element={<Capacitacions/>} />

      </Routes>
    </Router>
  );
}

export default App;
