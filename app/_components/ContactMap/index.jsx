"use client";
import { Icon, LatLng } from "leaflet";
import styles from "./styles.module.css";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useState } from "react";

const initialCenter = [30.390245794565757, -9.556749533359007];

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

function ContactMap() {
  const [center, setCenter] = useState([...initialCenter]);

  const handleReset = () => setCenter([30.390245794565757, -9.556749533359007]);

  return (
    <div className={styles.mapWrapper}>
      <button type="button" className={styles.goBackButton} onClick={handleReset}>
        Refresh
      </button>
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
    </div>
  );
}

export default ContactMap;
