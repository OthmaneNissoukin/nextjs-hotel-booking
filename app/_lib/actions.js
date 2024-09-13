"use server";
import { auth, signIn, signOut } from "@/auth";
import { signInSchema } from "./zodSchemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { areIntervalsOverlapping, isBefore, isValid } from "date-fns";
import { getReservationByID, getRoomReservations, updateReseration } from "./supabase/reservations";
import { bookingTotalPrice } from "../utils/reservationsCalcs";
import { daysDifferCount } from "../utils/datetime";
import { revalidatePath } from "next/cache";

export async function authAction(prevState, formData) {
  // await new Promise((res) => setTimeout(res, 500));
  const email = formData.get("email");
  const password = formData.get("password");
  prevState = {};

  if (!(email && password)) return { message: "email and password are required" };

  try {
    signInSchema.parse({ email, password });
  } catch (err) {
    err.errors.forEach((element) => {
      prevState[element?.path[0] ?? "unknown"] = element.message;
    });

    return { ...prevState };
  }

  const credentials = { email, password };
  console.log("Create Session");
  let loginSuccess = true;
  try {
    await signIn("credentials", { ...credentials, redirect: false });
  } catch (err) {
    loginSuccess = false;
    console.log(err.message);
    return { ...prevState, criticalError: "Wrong email or password!" };
  } finally {
    if (loginSuccess) redirect(cookies().has("pending_reservation") ? "/reservations/checkout" : "/account/history");
  }
}

export async function bookingCancelAction() {
  await new Promise((res) => setTimeout(res, 5000));
  const cookiesStore = cookies();
  if (cookiesStore.has("pending_reservation")) {
    cookies().delete("pending_reservation");
    redirect("/rooms", "replace");
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}

export async function reservationUpdateAction(prevState, formData) {
  prevState = {};

  console.log(formData);

  const start_date = new Date(formData.get("start_date"));
  const end_date = new Date(formData.get("end_date"));
  const guests_count = formData.get("guests");
  const reservation_id = formData.get("reservation_id");

  // CHECKING FOR DATES VALIDATION THAT WAS PICKED UP BY REACT DAYPICKER
  if (!(isValid(start_date) && isValid(end_date)))
    return { ...prevState, error: "Invalid date, please choose a range from the calendar" };
  if (isBefore(end_date, start_date))
    return { ...prevState, error: "Invalid date, please choose a valid rate range from the calendar" };

  // CHECKING FOR USER AUTHENTICATION AND THE EXISTENCE OF THE TARGETED RESERVATION
  const session = await auth();

  if (!session?.user)
    return { ...prevState, error: "Unauthorized to perform this action, please sign in and try again" };

  const target_reservation = await getReservationByID(reservation_id);

  if (!target_reservation)
    return {
      ...prevState,
      error:
        "Error, you are attempting to update an unexisted reservation. please access through your reservation history!",
    };

  // MAKING SURE THAT THE NEW SELECTED DATE RANGE DOES NOT INTERSECT WITH AN ALREADY BOOKED ONE
  // EXCEPT THE CURRENT RESERVATION THAT IS MEANT TO BE UPDATED
  const planned_room_reservations = await getRoomReservations(target_reservation.room_id);
  const room_busy_days = planned_room_reservations.filter((item) =>
    item.id != reservation_id
      ? {
          start: new Date(item.start_date),
          end: new Date(item.end_date),
        }
      : false
  );

  if (room_busy_days.find((item) => areIntervalsOverlapping(item, { start: start_date, end: end_date }))) {
    return {
      ...prevState,
      error: "Invalid date! The selected range already have a booked plan, please adjust your booking range",
    };
  }

  // CHECKING FOR THE USER AUTHORISATION TO UPDATE THE RESERVATION
  if (target_reservation.guest_id !== session.user.id)
    return { ...prevState, error: "Unauthorized to perform this action!" };

  if (guests_count < 1 || guests_count > target_reservation.rooms.capacity)
    return { ...prevState, error: "Invalid guests number! please choose a number from the dropdown area" };

  const totalNights = daysDifferCount(end_date, start_date);
  const new_total = bookingTotalPrice(target_reservation.rooms.price, guests_count, totalNights);
  await updateReseration(reservation_id, new_total, guests_count, start_date, end_date);

  revalidatePath(`/reservations/edit/${reservation_id}`);
  return { status: "success" };
}
