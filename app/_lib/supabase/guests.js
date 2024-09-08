import supabase from "./db";

export async function getGuestById(id) {
  let { data: guests, error } = await supabase.from("guests").select("*").eq("id", id).single();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}

export async function getGuestByEmail(email) {
  let { data: guests, error } = await supabase.from("guests").select("*").eq("email", email).single();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}

export async function updateGuest(id, name, nationality, phone, email) {
  const { data, error } = await supabase
    .from("guests")
    .update({ fullname: name, nationality, phone, email })
    .eq("id", id)
    .select();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return data;
}
