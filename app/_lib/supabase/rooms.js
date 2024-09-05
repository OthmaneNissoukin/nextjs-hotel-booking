import supabase from "./db";

export async function getAllRooms() {
  let { data: rooms, error } = await supabase.from("rooms").select("*");

  await new Promise((res) => setTimeout(res, 2000));

  console.log(rooms);
  return rooms;
}

export async function getRoomById() {
  let { data: rooms, error } = await supabase.from("rooms").select("id");

  return rooms;
}
