import { getGuestById } from "@/app/_lib/supabase/guests";
import { createNewReservation } from "@/app/_lib/supabase/reservations";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { daysDifferCount } from "@/app/utils/datetime";
import { bookingTotalPrice } from "@/app/utils/reservationsCalcs";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const requestBody = await req.json();
  const payload = requestBody.data?.object?.metadata?.payload;

  console.log({ event: requestBody.type });
  // console.log({
  //   meta: requestBody.data?.object?.metadata,
  //   payload: requestBody.data?.object?.metadata?.payload,
  //   requestBody,
  //   DATA: requestBody.data,
  // });

  if (!payload) return NextResponse.json({ status: "error", message: "missing required data" }, { status: 400 });

  const metadata = JSON.parse(payload);
  console.log(metadata);

  // 2 - CHECK PENDING RESERVATION
  if (!metadata.pending_reservation) {
    return NextResponse.json({ status: "error", message: "invalid requirements" }, { status: 422 });
  }

  const pending_reservation = metadata.pending_reservation;

  const [guest, room] = await Promise.all([getGuestById(metadata.guest_id), getRoomById(pending_reservation.room_id)]);

  if (!guest?.fullname || !room?.name) {
    console.log("missing guest || room");
    return NextResponse.json({ status: "error", message: "forbidden" }, { status: 403 });
  }

  switch (requestBody.type) {
    case "checkout.session.completed":
      const totalNights = daysDifferCount(pending_reservation.end_date, pending_reservation.start_date);
      const totalUSDPrice = bookingTotalPrice(room.price, pending_reservation.guests_count, totalNights);

      const new_res = await createNewReservation(
        metadata?.supabaseAccessToken,
        room.id,
        guest.id,
        pending_reservation.guests_count,
        pending_reservation.message,
        totalUSDPrice,
        pending_reservation.start_date,
        pending_reservation.end_date
      );
      cookies().delete("pending_reservation");
      cookies().delete("payment_id");
      console.log("PAYMENT SUCCEEDED, RESERVATION SAVED & COOKIES IS CLEARED");
      break;
    case "payment_intent.payment_failed":
      console.log("FAILED");
      break;
    default:
      console.log("UNMATCHED");
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
