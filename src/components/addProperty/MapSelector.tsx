'use client'

import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

const LocationSelector = ({ setLocation }: { setLocation: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}

export default function MapSelector({
  location,
  onChange
}: {
  location: { lat: number; lng: number }
  onChange: (latlng: { lat: number; lng: number }) => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <MapContainer center={location} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSelector setLocation={onChange} />
      <Marker position={location} icon={markerIcon} />
    </MapContainer>
  )
}
