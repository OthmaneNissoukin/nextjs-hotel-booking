"use client";
import styles from "./styles.module.css";

function CancelButton({ increment, isLoading }) {
  return (
    <button type="button" onClick={increment} className={styles.cancelButton} disabled={isLoading}>
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}

export default CancelButton;
