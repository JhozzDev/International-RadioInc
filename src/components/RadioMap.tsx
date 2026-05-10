"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  radios: any[];
};

export default function RadioMap({ radios }: Props) {
  const validRadios = radios.filter(
    (r) =>
      r.geo_lat &&
      r.geo_long &&
      !isNaN(Number(r.geo_lat)) &&
      !isNaN(Number(r.geo_long))
  );

  return (
    <div className="w-full   rounded-3xl overflow-hidden border border-white/10">
      <MapContainer
        zoom={2}
        scrollWheelZoom={true}
        className=""
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validRadios.map((radio) => (
          <Marker
            key={radio.stationuuid}
            position={[
              Number(radio.geo_lat),
              Number(radio.geo_long),
            ]}
          >
            <Popup>
              <div className="text-black">
                <img
                  src={radio.icon}
                  alt={radio.name}
                  className="w-14 h-14 rounded-full mb-2"
                />

                <h2 className="font-bold">
                  {radio.name}
                </h2>

                <p>{radio.country}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}