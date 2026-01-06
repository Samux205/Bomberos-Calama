import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // íconos de sol y luna
import { auth } from "../config/firebase"; // Tu archivo firebase.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Para redirigir al Home

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const toggleMode = () => setDarkMode(!darkMode);

  // Función para iniciar sesión con Firebase
  const handleLogin = async () => {
    const email = (document.querySelector(".login-input[type=email]") as HTMLInputElement).value;
    const password = (document.querySelector(".login-input[type=password]") as HTMLInputElement).value;

    if (!email || !password) {
      alert("Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Login exitoso!");
      navigate("/home"); // Redirige al Home después del login
    } catch (error: any) {
      alert("Error al iniciar sesión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para entrar como invitado
  const handleGuestLogin = () => {
    alert("Entrando sin iniciar sesión (modo invitado)");
    navigate("/home"); // Redirige al Home en modo invitado
  };

  return (
    <div className={`login-outer ${darkMode ? "dark" : "light"}`}>
      <div className="login-card">
        {/* Logo arriba */}
        <img src="/pictures/logo.jpg" alt="Logo Tercera Compañía" className="login-logo" />

        <h2 className="login-title">Login Tercera Compañía</h2>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />

        {/* Botón principal */}
        <button
          className="login-button btn-main"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>

        {/* Botón secundario */}
        <button
          className="login-button btn-guest"
          onClick={handleGuestLogin}
        >
          Entrar sin iniciar sesión
        </button>
      </div>

      {/* Botón flotante de modo oscuro/claro */}
      <button className="mode-toggle-floating" onClick={toggleMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
}
