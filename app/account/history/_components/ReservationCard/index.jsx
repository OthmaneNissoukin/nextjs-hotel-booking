import Image from "next/image";
import styles from "./styles.module.css";

import Badge from "@/app/_ui/Badge";
import { auth } from "@/auth";
import { deleteReservation, getReservationByID } from "@/app/_lib/supabase/reservations";
import { revalidatePath } from "next/cache";
import ControlButtons from "../ControlButtons";
import { reservationCancelAction, reservationUpdateAction } from "@/app/_lib/actions";
import { formatToAbrFormat } from "@/app/utils/datetime";
import { differenceInDays, isFuture, isPast } from "date-fns";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ reservation }) {
  async function deleteReservationAction(prevState, formData) {
    "use server";

    prevState = {};

    const session = await auth();
    const active_user = session?.user;

    if (!active_user) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    const targeted_reservation = await getReservationByID(reservation.id);

    if (targeted_reservation.status === "confirmed")
      return { ...prevState, error: "Cannot delete active reservations! You may want to cancel it instead" };

    if (targeted_reservation.guest_id !== active_user.id) return { ...prevState, error: "unauthorized action!" };

    await deleteReservation(session.supabaseAccessToken, reservation.id);
    revalidatePath("/account/history");

    return { ...prevState, status: "success" };
  }

  const arrivalDate = formatToAbrFormat(reservation.start_date);
  const departureDate = formatToAbrFormat(reservation.end_date);

  return (
    <article className={styles.reservationItem}>
      <div className={styles.reservationThumbnail}>
        <Image fill src={`${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`} />
      </div>

      <div className={styles.reservationInfos}>
        <div className={styles.reservationOverview}>
          <h2 className={styles.reservationTitle}>
            <span>{reservation.rooms.name}</span>

            {isPast(reservation.start_date) && isFuture(reservation.end_date) ? (
              <span className={`${styles.onGoing} ${styles.reservationEstimation}`}>ON GOING</span>
            ) : isFuture(reservation.start_date) ? (
              <span className={`${styles.future} ${styles.reservationEstimation}`}>FUTURE</span>
            ) : isPast(reservation.end_date) ? (
              <span className={`${styles.past} ${styles.reservationEstimation}`}>PAST</span>
            ) : (
              ""
            )}
          </h2>
          <p>
            {formatToAbrFormat(arrivalDate)} - {formatToAbrFormat(departureDate)}
          </p>

          <p>
            <span className={styles.price}>${reservation.reserved_price.toFixed(2)}</span> - {reservation.guests_count}{" "}
            Guest(s)
          </p>

          {/* CREATE A SEPARATED COMPONENT FOR THE STATUS AS BADGE */}
          <Badge
            type={
              reservation.status == "unconfirmed"
                ? "warning"
                : reservation.status == "canceled" || reservation.status == "finished"
                ? "danger"
                : "success"
            }
          >
            {reservation.status}
          </Badge>
        </div>
        <div className={styles.reservationPriceContainer}>
          {/* USE 3rd PARTY API FOR CURRENCY CONVERSION */}

          <ControlButtons
            reservationUpdateAction={reservationUpdateAction}
            deleteAction={deleteReservationAction}
            reservation={reservation}
            reservationCancelAction={reservationCancelAction}
          />

          {/* <DeleteForm deleteAction={deleteReservationAction} /> */}
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
