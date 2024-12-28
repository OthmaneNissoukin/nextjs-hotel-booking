import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import styles from "./styles.module.css";
import { cookies } from "next/headers";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { getGuestById, updateGuest } from "@/app/_lib/supabase/guests";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { reservationSchema } from "@/app/_lib/zodSchemas";
import { createNewReservation } from "@/app/_lib/supabase/reservations";
import { bookingCancelAction } from "@/app/_lib/actions";
import SelectCountry from "@/app/_ui/SelectCountry";
import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

async function CheckoutSection() {
  const session = await auth();

  const reservation_cookies = cookies();
  if (!reservation_cookies.has("pending_reservation")) {
    redirect("/rooms");
  }

  const pending_reservation = JSON.parse(reservation_cookies.get("pending_reservation").value);

  const [room, guest] = await Promise.all([getRoomById(pending_reservation.room_id), getGuestById(session.user?.id)]);

  if (!room) notFound();

  async function createReservationAction(prevState, formData) {
    "use server";
    console.log("state");
    console.log(prevState);
    prevState = { ...prevState, isConfirming: true };
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

    const total_price = (room.price + ((room.price / 2) * pending_reservation.guests_count - 1)).toFixed(2);

    try {
      const session = await auth();

      const new_res = await createNewReservation(
        session?.supabaseAccessToken,
        room.id,
        guest.id,
        pending_reservation.guests_count,
        message,
        total_price,
        pending_reservation.start_date,
        pending_reservation.end_date
      );
      await updateGuest(guest.id, fullname, nationality, countryFlag, phone, email, nationalID);
      // cookies().set("reservation_confirmed", "true");
      cookies().delete("pending_reservation");
    } catch (err) {
      console.log("CHECKOUT COOKIE ERROR");
      console.log(err);
      return { ...prevState, criticalErr: "Failed to confirm your booking!" };
    } finally {
      revalidatePath("/account/history");
      redirect("/account/history");
    }
  }

  return (
    <div className={`${styles.formSection} container`}>
      <CheckoutForm
        createReservationAction={createReservationAction}
        room={room}
        guest={guest}
        bookingCancelAction={bookingCancelAction}
      >
        {/* PASSING THIS AS CHILD TO PREVENT UNCESSACERY RERENDERS FOR THIS COMPONENT SINCE:
          1 - ITS A SERVER COMPONENT AND NEEDED TO BE RENDERED INSIDE A CLIENT COMPONENT
          2 - IT HAS SOME INNER API CALLS, SO RENDERING AS A CHILD WOULD PREVENT WASTING RENDERES
        */}
        <SelectCountry name={"nationality"} className={styles.formInput} defaultCountry={guest.nationality} />
      </CheckoutForm>

      <CheckoutOverview room={room} pending_reservation={pending_reservation} />
    </div>
  );
}

export default CheckoutSection;
