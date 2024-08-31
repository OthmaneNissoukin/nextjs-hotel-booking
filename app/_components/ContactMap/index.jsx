"use client";
import dynamic from "next/dynamic";
// const Icon = dynamic(() => import("leaflet").then((module) => module.Icon), { ssr: false });
// import { Icon } from "leaflet";
// Dynamically import React Leaflet components

// const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });

// const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
// const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });
// const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
// const useMap = dynamic(() => import("react-leaflet").then((module) => module.useMap), { ssr: false });
// const useMapEvent = dynamic(() => import("react-leaflet").then((module) => module.useMapEvent), { ssr: false });
// import { useMap, useMapEvent } from "react-leaflet";
import styles from "./styles.module.css";

const Map = dynamic((module) => import("../Map"), { ssr: false });

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
// import Map from "../Map";

const initialCenter = [30.390245794565757, -9.556749533359007];

function ContactMap() {
  const [center, setCenter] = useState([...initialCenter]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReset = () => setCenter([30.390245794565757, -9.556749533359007]);

  if (!isMounted) return null;

  return (
    <div className={styles.mapWrapper}>
      <button type="button" className={styles.goBackButton} onClick={handleReset}>
        Refresh
      </button>
      <Map initialCenter={initialCenter} center={center} />
    </div>
  );
}

export default ContactMap;
