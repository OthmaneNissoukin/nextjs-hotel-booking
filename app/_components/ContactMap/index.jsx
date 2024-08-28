"use client";
import dynamic from "next/dynamic";
const Icon = dynamic(() => import("leaflet").then((module) => module.Icon), { ssr: false });

// Dynamically import React Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const useMap = dynamic(() => import("react-leaflet").then((module) => module.useMap), { ssr: false });
const useMapEvent = dynamic(() => import("react-leaflet").then((module) => module.useMapEvent), { ssr: false });
const useMapEvents = dynamic(() => import("react-leaflet").then((module) => module.useMapEvents), { ssr: false });
import styles from "./styles.module.css";

import "leaflet/dist/leaflet.css";
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
