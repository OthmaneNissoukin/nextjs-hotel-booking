import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

// USED FOR UNAUTHENTICATED ACTIONS
const supabase = createClient(supabaseUrl, supabaseKey);

// USED FOR AUTHENTICATED ACTIONS
export function supabaseWithToken(supabaseAccessToken) {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
}

export default supabase;
