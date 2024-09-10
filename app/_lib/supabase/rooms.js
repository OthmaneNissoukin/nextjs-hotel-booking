import supabase from "./db";

export async function getAllRooms() {
  let { data: rooms, error } = await supabase.from("rooms").select("*");

  // await new Promise((res) => setTimeout(res, 2000));

  return rooms;
}

export async function getRoomById(id) {
  let { data: rooms, error } = await supabase.from("rooms").select("*").eq("id", id);

  return rooms?.at(0);
}

export async function getRoomImages(id) {
  let { data: room_images, error } = await supabase.from("room_images").select("*").eq("room_id", id);

  return room_images;
}

export async function filterRoomsByDate(start = "2024-09-21", end = "2024-09-27") {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("status", "confirmed")
    .or(
      `and(start_date.gte.${start},start_date.lte.${end}),and(end_date.gte.${start},end_date.lte.${end}),and(start_date.lte.${start}, end_date.gte.${end})`
    );

  if (error) {
    console.log(error);
  }

  const reservations_ids = reservations?.map((item) => item.room_id) ?? [];

  let { data: rooms, rooms_error } = await supabase
    .from("rooms")
    .select("*")
    .not("id", "in", `(${reservations_ids.join(",")})`);

  return rooms;
}
