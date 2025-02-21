"use client";

import styles from "./error.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.errorCode}>500</span>
      <h2 className={styles.errorTitle}>Server Error!</h2>
      <p className={styles.errorMessage}>
        {error?.message || "Something went wrong"}
      </p>
      <button className={styles.errorButton} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
