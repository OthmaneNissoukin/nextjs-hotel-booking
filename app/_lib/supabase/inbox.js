import { riskySupabaseClient } from "./supabaseRiskyClient";

export async function createMessage({ fullname, email, phone, message }) {
  let { data: inbox, error } = await riskySupabaseClient
    .from("inbox")
    .insert({ fullname, email, phone, message })
    .select("*")
    .order("created_at", { ascending: false })
    .single();

  if (error) {
    console.log({ messageError: error.message });
    throw new Error(error.message);
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return inbox;
}
