import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import styles from "./styles.module.css";
import { cookies } from "next/headers";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { getGuestById } from "@/app/_lib/supabase/guests";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { reservationSchema } from "@/app/_lib/zodSchemas";

async function CheckoutSection() {
  const session = await auth();
  const reservation_cookies = cookies();
  const pending_reservation = JSON.parse(reservation_cookies.get("pending_reservation").value);

  const [room, guest] = await Promise.all([getRoomById(pending_reservation.room_id), getGuestById(session.user?.id)]);

  if (!room) notFound();

  async function createReservationAction(prevState, formData) {
    "use server";
    console.log("state");
    console.log(prevState);
    const fullname = formData.get("fullname");
    const nationalID = formData.get("nationalID");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const nationalityWithFlag = formData.get("nationality");
    const message = formData.get("message");

    try {
      reservationSchema.parse({ fullname, email, phone, nationality: nationalityWithFlag, nationalID, message });
    } catch (err) {
      // console.log("errors");
      // console.log(err.errors);
      prevState = {};
      err?.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState };
    }

    const [nationality, countryFlag] = nationalityWithFlag.split("%");
    console.log("RESULT");
    console.log({ fullname, email, phone, nationalID, message, nationality, countryFlag });
  }

  return (
    <div className={`${styles.formSection} container`}>
      <CheckoutForm createReservationAction={createReservationAction} room={room} guest={guest} />

      <CheckoutOverview room={room} pending_reservation={pending_reservation} />
    </div>
  );
}

export default CheckoutSection;
