import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const supabaseSchemaEnv =
  process.env.NEXT_PUBLIC_SUPABASE_SCHEMA_ENV ?? "PUBLIC";

// USED TO BYPASS AUTH & RLS POLICIES
export const riskySupabaseClient = createClient(supabaseUrl, secretKey, {
  db: { schema: supabaseSchemaEnv },
});
