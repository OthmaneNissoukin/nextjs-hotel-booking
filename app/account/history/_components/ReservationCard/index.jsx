import Image from "next/image";
import styles from "./styles.module.css";

import Badge from "@/app/_ui/Badge";
import { auth } from "@/auth";
import { deleteReservation, getReservationByID } from "@/app/_lib/supabase/reservations";
import { revalidatePath } from "next/cache";
import ControlButtons from "../ControlButtons";
import { reservationCancelAction, reservationUpdateAction } from "@/app/_lib/actions";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ reservation }) {
  async function deleteReservationAction(prevState, formData) {
    "use server";

    prevState = {};

    const active_user = (await auth())?.user;

    if (!active_user) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    const targeted_reservation = await getReservationByID(reservation.id);

    if (targeted_reservation.status === "confirmed")
      return { ...prevState, error: "Cannot delete active reservations! You may want to cancel it instead" };

    if (targeted_reservation.guest_id !== active_user.id) return { ...prevState, error: "unauthorized action!" };

    await deleteReservation(reservation.id);
    revalidatePath("/account/history");

    return { ...prevState, status: "success" };
  }

  return (
    <article className={styles.reservationItem}>
      <div className={styles.reservationThumbnail}>
        <Image fill src={`${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`} />
      </div>

      <div className={styles.reservationInfos}>
        <div className={styles.reservationOverview}>
          <h2>{reservation.rooms.name}</h2>
          <p>{reservation.guestsCount} Guests</p>
          <p>{`${reservation.start_date?.split("-").reverse().join("-")} / ${reservation.end_date
            ?.split("-")
            .reverse()
            .join("-")}`}</p>

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
          <p>{reservation.price}</p>

          <div className={styles.controlButtons}>
            <ControlButtons
              reservationUpdateAction={reservationUpdateAction}
              deleteAction={deleteReservationAction}
              reservation={reservation}
              reservationCancelAction={reservationCancelAction}
            />
          </div>

          {/* <DeleteForm deleteAction={deleteReservationAction} /> */}
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
