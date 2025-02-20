"use client";

import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";
import Image from "next/image";
// import NotFoundImg from "@/public/not-found.png"; // Place an image inside `public/` directory

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <img
        // src={NotFoundImg}
        src={"https://placehold.it/250x250/777"}
        alt="Page Not Found"
        className={styles.notFoundImage}
        width={250}
        height={250}
      />
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
