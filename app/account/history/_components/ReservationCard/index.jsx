import Image from "next/image";
import styles from "./styles.module.css";

import Badge from "@/app/_ui/Badge";
import { auth } from "@/auth";
import { deleteReservation, getReservationByID } from "@/app/_lib/supabase/reservations";
import DeleteForm from "../DeleteFrom";
import { revalidatePath } from "next/cache";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ reservation_id, thumbnailPath = "/bg.png", title, guestsCount, date, price, status }) {
  async function deleteReservationAction(prevState, formData) {
    "use server";

    prevState = {};

    const active_user = (await auth())?.user;

    if (!active_user) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    const targeted_reservation = await getReservationByID(reservation_id);

    if (targeted_reservation.status === "confirmed")
      return { ...prevState, error: "Cannot delete active reservations! You may want to cancel it instead" };

    if (targeted_reservation.guest_id !== active_user.id) return { ...prevState, error: "unauthorized action!" };

    await deleteReservation(reservation_id);
    revalidatePath("/account/history");

    return { ...prevState, status: "success" };
  }

  return (
    <article className={styles.reservationItem}>
      <div className={styles.reservationThumbnail}>
        <Image fill src={`${SUPABASE_ROOMS_URL}/${thumbnailPath}`} />
      </div>

      <div className={styles.reservationInfos}>
        <div className={styles.reservationOverview}>
          <h2>{title}</h2>
          <p>{guestsCount} Guests</p>
          <p>{date}</p>

          {/* CREATE A SEPARATED COMPONENT FOR THE STATUS AS BADGE */}
          <Badge
            type={
              status == "unconfirmed" ? "warning" : status == "canceled" || status == "finished" ? "danger" : "success"
            }
          >
            {status}
          </Badge>
        </div>
        <div className={styles.reservationPriceContainer}>
          {/* USE 3rd PARTY API FOR CURRENCY CONVERSION */}
          <p>{price}</p>
          <DeleteForm deleteAction={deleteReservationAction} />
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
