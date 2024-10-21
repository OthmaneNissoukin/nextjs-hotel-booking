import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// USED TO BYPASS AUTH & RLS POLICIES
export const riskySupabaseClient = createClient(supabaseUrl, secretKey);
