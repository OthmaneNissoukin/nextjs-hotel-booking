import supabase from "./db";

export async function getRoomReservations(id) {
  let { data: reservations, error } = await supabase.from("reservations").select("*").eq("room_id", id);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}
