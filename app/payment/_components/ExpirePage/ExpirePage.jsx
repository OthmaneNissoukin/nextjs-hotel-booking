"use client";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ExpirePage = () => {
  const router = useRouter();
  return (
    <>
      <div className={`container ${styles.expiredCard}`}>
        <div className={styles.expiredIcon}>{/* <Clock size={48} /> */}</div>
        <h2 className={styles.expiredTitle}>Payment Session Expired</h2>
        <p className={styles.expiredMessage}>
          Your payment session has expired. Sessions automatically expire if not completed or submitted within 2 hours
          of creation.
        </p>

        <div className={styles.infoBox}>
          {/* <AlertCircle className={styles.infoIcon} size={20} /> */}
          <p>
            If your payment was successful, your order had already processed. Otherwise, please start a new session to
            complete your purchase.
          </p>
        </div>

        <div className={styles.actionButtons}>
          <Link href={"/rooms"} className={styles.primaryButton}>
            {/* <RefreshCcw size={20} /> */}
            Start New Booking
          </Link>
          <button onClick={() => router.back()} className={styles.secondaryButton}>
            {/* <ArrowLeft size={20} /> */}
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpirePage;
