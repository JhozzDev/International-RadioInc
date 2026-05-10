"use client";

import { useEffect, useState } from "react";
import MapClient from "@/components/MapClient";
import type { Radio } from "@/types";

export default function World() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";

  const [radios, setRadios] = useState<Radio[]>([]);

  useEffect(() => {
    async function loadRadios() {
      try {
        const res = await fetch(
          `${API_BASE}/all`
        );

        const data: Radio[] =
          await res.json();

        setRadios(data);
      } catch (err) {
        console.error(
          "Error loading radios:",
          err
        );
      }
    }

    loadRadios();
  }, []);

  return (
    <div className="w-full h-full">
      <MapClient stations={radios} />
    </div>
  );
}