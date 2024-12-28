import { formatISO, formatISO9075 } from "date-fns";
import supabase, { supabaseWithToken } from "./db";

export async function getRoomReservations(id) {
  let { data: reservations, error } = await supabase.from("reservations").select("*").eq("room_id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function getGuestReservations(guest_id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(thumbnail, name, capacity)")
    .eq("guest_id", guest_id)
    .is("deleted_at", null);

  if (error) {
    console.log("SUPABASE ERROR");
    console.log(error);
  }

  return reservations;
}
/**
 * fullname,
  email,
  phone,
  nationality,
  countryFlag,
  reserved_price,
  nationalID,
 */

export async function createNewReservation(
  supabaseAccessToken,
  room_id,
  guest_id,
  guests_count,
  message,
  reserved_price,
  start_date,
  end_date
) {
  const { data: reservations, error } = await supabaseWithToken(supabaseAccessToken)
    .from("reservations")
    .insert([
      {
        room_id,
        guest_id,
        guests_count,
        reserved_price,
        message,
        start_date,
        end_date,
      },
    ])
    .select();

  console.log({ NEW_RESERVATION: reservations });
  if (error) {
    // console.log("===== CREATION ERROR =====");
    console.log({ RESERVATION_ERROR: error });
    // console.log(session);
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function deleteReservation(supabaseAccessToken, id) {
  const { data: reservations, error } = await supabaseWithToken(supabaseAccessToken)
    .from("reservations")
    .update({ deleted_at: formatISO9075(new Date()) })
    .eq("id", id);

  console.log("datetime", formatISO9075(new Date()));
  return reservations;
}

export async function getReservationByID(id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(thumbnail, name, capacity, price)")
    .eq("id", id)
    .single();

  return reservations;
}

export async function updateReseration(supabaseAccessToken, id, price, guests_count, start_date, end_date) {
  const { data: reservations, error } = await supabaseWithToken(supabaseAccessToken)
    .from("reservations")
    .update({
      reserved_price: price,
      guests_count,
      start_date: formatISO9075(new Date(start_date)),
      end_date: formatISO9075(new Date(end_date)),
    })
    .eq("id", id);

  console.log("SUPABASE ERROR");
  console.log(error);

  return reservations;
}

export async function cancelReservation(supabaseAccessToken, id) {
  const { data: reservations, error } = await supabaseWithToken(supabaseAccessToken)
    .from("reservations")
    .update({ status: "cancelled" })
    .eq("id", id);

  console.log("datetime", formatISO9075(new Date()));
  return reservations;
}
