import supabase from "./db";

export async function getAllRooms() {
  let { data: rooms, error } = await supabase.from("rooms").select("*");

  await new Promise((res) => setTimeout(res, 2000));

  console.log(rooms);
  return rooms;
}

export async function getRoomById(id) {
  let { data: rooms, error } = await supabase.from("rooms").select("*").eq("id", id);

  return rooms?.at(0);
}

export async function getRoomImages(id) {
  let { data: room_images, error } = await supabase.from("room_images").select("*").eq("room_id", id);
  console.log("SERVICE");
  console.log(room_images);

  return room_images;
}
