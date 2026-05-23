"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false 
});
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
        console.log("API response:", data); 
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
      <div className="fixed bottom-2.5 left-2.5 right-0 z-50 flex mt-5 justify-between items-center px-[3%] h-14"><Link href="/"><button className="bg-purple-700 w-34 text-white border-none rounded-xl px-4 py-2 text-base cursor-pointer shadow-[0_0_20px_#7c3aed] hover:bg-purple-600">Exit</button></Link></div>
      <MapClient stations={radios} />
    </div>
  );
}