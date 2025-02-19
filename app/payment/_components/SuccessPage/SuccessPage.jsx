"use client";
import Image from "next/image";
import styles from "./index.module.css";
import Banner from "@/app/_components/Banner";
import { format } from "date-fns";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

async function SuccessPage({ reservation }) {
  if (reservation.status?.toLowerCase() === "confirmed")
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/clear-pending-reservation`,
        { method: "POST" }
      );
    } catch (err) {
      console.log({ err });
    }
  return (
    <>
      <Banner title={"CHECKOUT OVERVIEW"} />
      <div className={`container ${styles["confirmation-card"]}`}>
        <h2 className={`${styles["section-title"]}`}>Reservation Details</h2>
        <div className={`${styles["confirmation-grid"]}`}>
          <div className={`${styles["confirmation-details"]}`}>
            <div className={`${styles["detail-group"]}`}>
              <label>Booking Number</label>
              <span>#{String(reservation.id).padStart(6, "0")}</span>
            </div>
            <div className={`${styles["detail-group"]}`}>
              <label>Room Type</label>
              <span>{reservation.rooms?.name}</span>
            </div>
            <div className={`${styles["detail-group"]}`}>
              <label>Check-in Date</label>
              <span>{format(reservation.start_date, "LLL, dd yyyy")}</span>
            </div>
            <div className={`${styles["detail-group"]}`}>
              <label>Check-out Date</label>
              <span>{format(reservation.end_date, "LLL, dd yyyy")}</span>
            </div>

            <div className={`${styles["detail-group"]}`}>
              <label>Guests</label>
              <span>{reservation.guests_count} Guests</span>
            </div>
            <div className={`${styles["detail-group"]}`}>
              <label>Total Amount</label>
              <span>${(reservation.reserved_price * 1).toFixed(2)}</span>
            </div>
          </div>
          <div className={`${styles["room-preview"]}`}>
            <Image
              src={`${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
              alt="Room Preview"
              width={800}
              height={264}
              className={`${styles["room-image"]}`}
            />
          </div>
        </div>
        <div className={`${styles["action-buttons"]}`}>
          <button
            onClick={() =>
              toast.error("This feature hasn't been implemented yet")
            }
            className={`${styles["primary-button"]}`}
          >
            Download Confirmation
          </button>
          <Link href={"/rooms"} className={`${styles["secondary-button"]}`}>
            Return to Home
          </Link>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default SuccessPage;
