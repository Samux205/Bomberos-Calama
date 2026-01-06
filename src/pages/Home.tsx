import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { FaSun, FaMoon } from "react-icons/fa";
import FireStatPie from "../components/FireStatPie";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* =====================
     EFECTOS
  ====================== */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =====================
     HELPERS
  ====================== */
  const toggleMode = () => setDarkMode((prev) => !prev);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  const getCurrentShift = () => {
    const today = new Date();
    const jan7 = new Date(today.getFullYear(), 0, 7);
    const jan13 = new Date(today.getFullYear(), 0, 13);

    if (today >= jan7 && today <= jan13) return "Diurna";

    const jan14 = new Date(today.getFullYear(), 0, 14);
    const diffDays = Math.floor(
      (today.getTime() - jan14.getTime()) / (1000 * 60 * 60 * 24)
    );

    return Math.floor(diffDays / 14) % 2 === 0 ? "Nocturna" : "Diurna";
  };

  /* =====================
     RUTAS CONTÁCTANOS
  ====================== */
  const contactRoutes: Record<string, string> = {
    Inscripción: "/Inscripcio",
    Solicitudes: "/Solicituds",
    Capacitaciones: "/Capacitacions",
    Dudas: "/Dubtes",
  };

  /* =====================
     DATA
  ====================== */
  const specialties = [
    { title: "Hazmat", desc: "Respuesta a incidentes con materiales peligrosos." },
    { title: "Rescate Vehicular", desc: "Extricación y atención inicial." },
    { title: "Unidad Canina", desc: "Búsqueda y rescate K9." },
    { title: "Abastecimiento", desc: "Suministro continuo de agua." },
  ];

  const emergencies = [
    { title: "Incendio estructural", desc: "Vivienda sector norte." },
    { title: "Accidente vehicular", desc: "Colisión ruta 21." },
    { title: "Búsqueda rural", desc: "Unidad K9 desplegada." },
  ];

  const units = [
    { title: "Unidad 1", desc: "Carro bomba", img: "/pictures/unidades/unidad1.jpg" },
    { title: "Unidad 2", desc: "Rescate vehicular", img: "/pictures/unidades/unidad2.jpg" },
    { title: "Unidad 3", desc: "Abastecimiento", img: "/pictures/unidades/unidad3.jpg" },
  ];

  /* =====================
     ESTILOS
  ====================== */
  const bgColor = darkMode ? "#151515" : "#f3f6f2";
  const textColor = darkMode ? "#f3f6f2" : "#15150a";
  const cardBg = darkMode ? "#1f1f1f" : "#ffffff";
  const cardBorder = "#8b7739";

  const FOOTER_HEIGHT = isMobile ? 120 : 60;

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: darkMode ? "#0a2f15" : "#094823",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1.2rem",
        }}
      >
        <img src="/pictures/Logo.png" alt="Logo" style={{ height: 45 }} />

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* CONTÁCTANOS */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setContactOpen((p) => !p)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                padding: "0.4rem 0.7rem",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Contáctanos
            </button>

            {contactOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 8,
                  padding: "0.4rem",
                  minWidth: 180,
                  zIndex: 2000,
                }}
              >
                {Object.keys(contactRoutes).map((label) => (
                  <button
                    key={label}
                    type="button" // 🔥 FIX CRÍTICO
                    onClick={() => {
                      navigate(contactRoutes[label]);
                      setContactOpen(false);
                    }}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: textColor,
                      padding: "0.5rem",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LOGIN */}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                padding: "0.4rem 0.7rem",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                padding: "0.4rem 0.7rem",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>

      {/* CONTENIDO */}
      <main style={{ padding: "1.5rem", paddingBottom: FOOTER_HEIGHT + 20 }}>
        <h2>Emergencias Recientes</h2>
        <Swiper spaceBetween={20} slidesPerView={1}>
          {emergencies.map((e, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  background: cardBg,
                  border: `2px solid ${cardBorder}`,
                  padding: "1rem",
                  borderRadius: 12,
                }}
              >
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: FOOTER_HEIGHT,
          backgroundColor: darkMode ? "#0a2f15" : "#094823",
          color: "#f3f6f2",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <strong>⏱ Turno</strong>
          <div>{getCurrentShift()}</div>
        </div>
      </footer>

      {/* DARK MODE */}
      <button
        onClick={toggleMode}
        style={{
          position: "fixed",
          bottom: FOOTER_HEIGHT + 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
        }}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
}
