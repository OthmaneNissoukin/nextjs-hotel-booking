import styles from "./styles.module.css";
import { getReservationByID } from "@/app/_lib/supabase/reservations";
import { notFound } from "next/navigation";
import EditContainer from "../EditContainer";
import { reservationUpdateAction } from "@/app/_lib/actions";

async function EditSection({ reservation_id }) {
  console.log("RESERVATION => ", reservation_id);

  // TODO: READ CURRENT GUEST AND CHECK FOR UPDATE AUTHORITY
  const reservation = await getReservationByID(reservation_id);
  if (!reservation) notFound();

  const isUpdateAllowed = reservation.status === "confirmed" || reservation.status === "unconfirmed";

  if (!isUpdateAllowed) return <h4>Sorry, but reservation cannot be edited.</h4>;

  return (
    <div className={`${styles.formSection} container`}>
      <EditContainer reservation={reservation} reservationUpdateAction={reservationUpdateAction} />
    </div>
  );
}

export default EditSection;
