"use client";

import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <span className={styles.errorCode}>404</span>
      <h2 className={styles.notFoundTitle}>Oops! Page Not Found</h2>
      <p className={styles.notFoundMessage}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button
        className={styles.notFoundButton}
        onClick={() => router.push("/")}
      >
        Go Back Home
      </button>
    </div>
  );
}
