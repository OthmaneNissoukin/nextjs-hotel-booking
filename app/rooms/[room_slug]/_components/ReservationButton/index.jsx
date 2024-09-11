"use client";
import styles from "./styles.module.css";

import { useFormStatus } from "react-dom";

function ReservationButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.formButton} disabled={pending}>
      {pending ? "Booking..." : "Book Now"}
    </button>
  );
}

export default ReservationButton;
