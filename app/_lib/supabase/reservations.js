import supabase from "./db";

export async function getRoomReservations(id) {
  let { data: reservations, error } = await supabase.from("reservations").select("*").eq("room_id", id);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function getGuestReservations(userId) {
  try {
    const { data, error } = await supabase.from("reservations").select("*").eq("user_id", userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}
