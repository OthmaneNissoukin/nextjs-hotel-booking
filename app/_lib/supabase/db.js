import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// TODO: CREATE URL TO BYPASS RLS AND AUTH

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

// USED TO BYPASS AUTH & RLS POLICIES
export const riskySupabaseClient = createClient(supabaseUrl, secretKey);
export default supabase;
