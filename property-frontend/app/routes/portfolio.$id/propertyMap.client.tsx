import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Property } from "~/types/property";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const defaultCenter = properties.length
    ? [properties[0].coordinates.lat, properties[0].coordinates.lng]
    : [0, 0]; // Fallback to (0, 0) if no properties are available

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      className="h-96 w-full rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.coordinates.lat, property.coordinates.lng]}
        >
          <Popup>
            <h3 className="text-lg font-bold">{property.name}</h3>
            <p>{property.address}</p>
            <p>
              Risks: {property.handled_risks}/{property.relevant_risks}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
