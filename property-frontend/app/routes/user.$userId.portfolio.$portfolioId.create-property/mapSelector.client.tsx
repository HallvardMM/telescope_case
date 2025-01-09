import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

interface MapSelectorProps {
  onSelectCoordinates: (lat: number, lng: number) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onSelectCoordinates }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onSelectCoordinates(lat, lng);
      },
    });

    return null;
  };

  return (
    <div className="h-96">
      <MapContainer
        center={[59.9139, 10.7522]} // Default to Oslo coordinates
        zoom={13}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>
    </div>
  );
};

export default MapSelector;
