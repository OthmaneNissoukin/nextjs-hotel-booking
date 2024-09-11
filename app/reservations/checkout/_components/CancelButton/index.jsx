"use client";
import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function CancelButton({ handleCancel, isLoading }) {
  const { pending } = useFormStatus();
  return (
    <button type="button" onClick={handleCancel} className={styles.cancelButton} disabled={isLoading || pending}>
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}

export default CancelButton;
