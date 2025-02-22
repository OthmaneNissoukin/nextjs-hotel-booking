import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabaseSchemaEnv =
  process.env.NEXT_PUBLIC_SUPABASE_SCHEMA_ENV ?? "PUBLIC";

// USED FOR UNAUTHENTICATED ACTIONS
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: supabaseSchemaEnv },
});

// USED FOR AUTHENTICATED ACTIONS
export function supabaseWithToken(supabaseAccessToken) {
  return createClient(supabaseUrl, supabaseKey, {
    db: { schema: supabaseSchemaEnv },
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
}

export default supabase;
