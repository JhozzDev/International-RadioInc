"use client"

import dynamic from "next/dynamic"

const RadioMap = dynamic(
  () => import("./Map"),
  {
    ssr: false,
  }
)

export default function MapClient({
  stations,
}: {
  stations: any[]
}) {
  return <RadioMap stations={stations} />
}