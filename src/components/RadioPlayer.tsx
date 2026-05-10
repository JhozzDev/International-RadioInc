"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import MapClient from "./MapClient";
import type { Pais, Radio } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function RadioPlayer() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [indice, setIndice] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [estado, setEstado] = useState("Listo");
  const [volume, setVolume] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [paisActivo, setPaisActivo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 10;

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch("/paises.json")
      .then((r) => {
        console.log("status:", r.status);
        return r.json();
      })
      .then((data) => {
        console.log("paises cargados:", data.length);
        setPaises(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const radioActual = radios[indice] ?? null;
  const radioSiguiente = radios[indice + 1] ?? null;

  const reproducir = useCallback(
    (radio: Radio) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = radio.url;
      audio.volume = volume;
      audio.play().catch(() => setEstado("❌ Radio no disponible"));
      setPlaying(true);
      setImgError(false);
      setEstado("Reproduciendo...");
    },
    [volume],
  );

  useEffect(() => {
    if (radioActual) reproducir(radioActual);
  }, [indice, radios]);

  const seleccionarPais = async (pais: Pais) => {
    setPaisActivo(pais.nombre);
    setMenuOpen(false);
    setLoading(true);
    setEstado("Buscando radios...");
    setPlaying(false);
    setRadios([]);

    try {
      const res = await fetch(`${API_BASE}/radios?country=${pais.ingles}`);
      const data: Radio[] = await res.json();
      setRadios(data);
      console.log(data)
      setIndice(0);
      if (data.length === 0) setEstado("❌ No se encontraron radios");
    } catch {
      setEstado("❌ Error al cargar radios");
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      setEstado("Pausado");
    } else {
      audio.play();
      setPlaying(true);
      setEstado("Reproduciendo...");
    }
  };

  const siguiente = () => {
    if (!radios.length) return;
    setIndice((i) => (i + 1) % radios.length);
  };

  const anterior = () => {
    if (!radios.length) return;
    setIndice((i) => (i - 1 + radios.length) % radios.length);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const iconSrc =
    !imgError && radioActual?.icon ? radioActual.icon : "/Off.webp";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(57,20,71,1) 0%, rgba(0,0,0,1) 57%)",
      }}
    >



      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex mt-5 justify-between items-center px-[3%] h-14">
        <button
          onClick={() => {
            setMenuOpen(true);
            setProfileOpen(false);
          }}
          className="bg-purple-700 text-white border-none rounded-xl px-4 py-2 text-base cursor-pointer shadow-[0_0_20px_#7c3aed] hover:bg-purple-600 transition-colors"
        >
          ☰ Países
        </button>
        <button
          onClick={() => {
            console.log("click países");
            setProfileOpen(true);
            setMenuOpen(false);
          }}
          className="bg-purple-700 text-white border-none rounded-xl px-4 py-2 text-base cursor-pointer shadow-[0_0_20px_#7c3aed] hover:bg-purple-600 transition-colors"
        >
          👤 Perfil
        </button>
      </div>
      {/* Country menu */}
      <div
        className={`fixed top-0 left-0 h-full w-67.5 bg-[#0f0f1a] border-r border-purple-700/30 z-300 transition-transform duration-300 overflow-y-auto pb-6 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-5 border-b border-white/10 sticky top-0 bg-[#0f0f1a]">
          <h3 className="text-white m-0 font-semibold text-lg">Países</h3>
          <button
            onClick={() => setMenuOpen(false)}
            className="bg-transparent border-none text-white text-xl cursor-pointer hover:text-purple-400 transition-colors"
          >
            ✕
          </button>
        </div>
        {paises.map((pais) => (
          <button
            key={pais.codigo}
            onClick={() => seleccionarPais(pais)}
            className={`flex items-center gap-3 w-full px-4 py-3 bg-transparent border-none text-[15px] cursor-pointer text-left transition-all duration-200 font-[inherit] ${
              paisActivo === pais.nombre
                ? "bg-purple-700/40 text-purple-300 border-l-[3px] border-purple-600"
                : "text-gray-300 hover:bg-purple-700/20 hover:text-white"
            }`}
          >
            <img
              src={`https://flagcdn.com/24x18/${pais.codigo.toLowerCase()}.png`}
              alt={pais.nombre}
              className="rounded-sm"
              width={24}
              height={18}
            />
            {pais.nombre}
          </button>
        ))}
      </div>
      {/* Profile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-67.5 bg-[#0f0f1a] border-l border-purple-700/30 z-300 transition-transform duration-300 overflow-y-auto pb-6 ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-5 border-b border-white/10 sticky top-0 bg-[#0f0f1a]">
          <h3 className="text-white m-0 font-semibold text-lg">Profile</h3>
          <button
            onClick={() => setProfileOpen(false)}
            className="bg-transparent border-none text-white text-xl cursor-pointer hover:text-purple-400 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col p-3 gap-1">
          {[
            "Mi cuenta",
            "Favoritos",
            "Historial",
            "Configuración",
            "Idioma",
            "Notificaciones",
            "Privacidad",
            "Ayuda",
            "Acerca de",
            "Cerrar sesión",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md flex items-center text-white p-4 cursor-pointer hover:bg-purple-700/20 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* Overlay */}
      {(menuOpen || profileOpen) && (
        <div
          className="fixed inset-0 bg-black/60 z-200"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
        />
      )}

      {/* Player card */}
      <div className="bg-white/5 backdrop-blur-md border md:w-2/3 border-white/10 rounded-3xl p-8 text-center text-white w-full mx-4">
    
        {/* Cover */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-[0_0_40px_#7c3aed]">
            <Image
              src={iconSrc}
              alt="Radio logo"
              fill
              className={`object-cover ${playing ? "spinning" : "paused"}`}
              onError={() => setImgError(true)}
              unoptimized
            />
          </div>
          <span className="block mt-2 text-xs blinking">🔴 EN VIVO</span>
        </div>

        {/* Info */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold truncate">
            {radioActual?.name ?? "Selecciona una radio"}
          </h2>
          <p className="text-gray-400 text-sm">
            {radioActual?.country ?? "--"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={anterior}
            disabled={!radios.length}
            className="bg-transparent border-none text-white text-[30px] cursor-pointer disabled:opacity-30 hover:text-purple-400 transition-colors"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            disabled={!radios.length}
            className="w-16 h-16 rounded-full bg-purple-700 shadow-[0_0_25px_#7c3aed] border-none text-2xl text-white cursor-pointer transition-transform active:scale-90 hover:bg-purple-600 disabled:opacity-40"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            onClick={siguiente}
            disabled={!radios.length}
            className="bg-transparent border-none text-white text-[30px] cursor-pointer disabled:opacity-30 hover:text-purple-400 transition-colors"
          >
            ⏭
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mb-4">
          <span>🔈</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="flex-1"
          />
          <span>🔊</span>
        </div>

        {/* Status & counter */}
        <p className="text-sm text-gray-400">
          {loading ? "⏳ Cargando..." : estado}
        </p>
        {radios.length > 0 && (
          <p className="text-xs text-purple-400 mt-1">
            {indice + 1} / {radios.length}
          </p>
        )}
      </div>
      <audio
        ref={audioRef}
        onWaiting={() => setEstado("⏳ Conectando...")}
        onPlaying={() => setEstado("🎵 Reproduciendo")}
        onError={() => setEstado("❌ Radio no disponible")}
      />
      <div
        className="flex bottom-0 fixed w-125 p-1.5 bg-purple-800 h-14 gap-2 justify-center m-3.5 rounded-2xl"
        style={{
          background:
            "linear-gradient(181deg, rgb(97 48 48) 0%, rgb(83 34 101) 0%, rgb(56 42 77) 57%);",
        }}
      >
        <img src={radioSiguiente?.icon ?? iconSrc} alt="" className="w-fit" />
        <div className="flex flex-col  text-white">
          <p className="text-xs  mt-1">{radioSiguiente?.name ?? "Unknown"}</p>
          <p className="text-xs">{radioSiguiente?.language ?? "Unknown"}</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-64 mr-10  hidden md:block ">
        <table className="w-full text-sm">
          <tbody>
            {radios.map((radio) => (
              <tr
                className={
                  radioActual.url == radio.url
                    ? "p-4 border-b text-white bg-purple-600 border-gray-600/10"
                    : "border-b text-white border-gray-700/10 hover:bg-purple-600/5"
                }
              >
                <td className={radioActual.url == radio.url ? "p-4" : "p-2"}>
                  {radio.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
  );
}
