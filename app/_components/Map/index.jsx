"use client";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function ChangeView({ position }) {
  const map = useMap();
  if (position) map.flyTo(position, 13);

  return null;
}

function Map({ initialCenter, center }) {
  return (
    <MapContainer style={{ height: "100%" }} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={new Icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}
        position={[30.390245794565757, -9.556749533359007]}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SetViewOnClick />
      <ChangeView position={initialCenter} />
    </MapContainer>
  );
}

export default Map;
