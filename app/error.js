"use client";

import styles from "./error.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Something went wrong!</h2>
      <p className={styles.errorMessage}>{error?.message || "Server Error"}</p>
      <button className={styles.errorButton} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
