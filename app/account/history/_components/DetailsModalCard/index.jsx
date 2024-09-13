"use client";

import styles from "./styles.module.css";

// import { useState } from "react";
import ReservationOverview from "../ReservationOverview";
import ReservationUpdate from "../ReservationUpdate";
import { useState } from "react";

function DetailsModalCard({ reservation, deleteAction, children }) {
  const [isUpdate, setIsUpdate] = useState(false);

  if (!isUpdate)
    return (
      <div className={styles.overviewContainer}>
        <ReservationOverview requestUpdateForm={setIsUpdate} reservation={reservation} deleteAction={deleteAction} />
        {children}
      </div>
    );

  return (
    <div className={styles.overviewContainer}>
      <ReservationUpdate reservation={reservation} />
      {children}
    </div>
  );
}

export default DetailsModalCard;
