import { authAction } from "@/app/_lib/actions";
import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import styles from "./styles.module.css";
import { cookies } from "next/headers";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { getGuestById } from "@/app/_lib/supabase/guests";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

async function CheckoutSection() {
  const session = await auth();
  const reservation_cookies = cookies();
  const pending_reservation = JSON.parse(reservation_cookies.get("pending_reservation").value);

  const [room, guest] = await Promise.all([getRoomById(pending_reservation.room_id), getGuestById(session.user?.id)]);
  console.log(room, guest);

  if (!room) notFound();

  return (
    <div className={`${styles.formSection} container`}>
      <CheckoutForm authAction={authAction} room={room} guest={guest} />

      <CheckoutOverview room={room} pending_reservation={pending_reservation} />
    </div>
  );
}

export default CheckoutSection;
