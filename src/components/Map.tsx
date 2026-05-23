"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Station = {
  id: string
  name: string
  icon: string
  country: string
  url: string
  geo_lat: number | null
  geo_long: number | null
}

// Fix icon issue in NextJS
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function RadioMap({
 stations = [], 
}: {
  stations: Station[]
}) {
  const validStations = stations.filter(
    (station) => station.geo_lat && station.geo_long
  )

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      className="h-dvh w-full rounded-xl z-20"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.geo_lat!, station.geo_long!]}
        >
          <Popup>
            <div className="flex flex-col gap-2">
              <img
                src={station.icon}
                alt={station.name}
                className="w-16 h-16 object-cover rounded"
              />

              <h2 className="font-bold">
                {station.name}
              </h2>

              <p>{station.country}</p>

              <audio controls src={station.url} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}