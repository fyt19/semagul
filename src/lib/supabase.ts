import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/** Browser-safe Supabase client (publishable key). */
export function createBrowserSupabaseClient() {
  return createClient(supabaseUrl, supabasePublishableKey);
}

/** Server-side Supabase client with secret key — use only in Server Actions/API routes. */
export function createServerSupabaseClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("SUPABASE_SECRET_KEY is not configured");
  }
  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
