import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para o ELITE (elite.adventurelabs.com.br).
 * Usa o schema "elite" no mesmo projeto Supabase do site principal,
 * para não misturar com outras tabelas (adventurelabs.com.br).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: "elite" },
    }
  );
}
