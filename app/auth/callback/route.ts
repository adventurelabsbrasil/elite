import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Callback da OAuth (ex.: Google). Supabase redireciona aqui com ?code=...
 * Troca o code por sessão, grava nos cookies e redireciona para /admin.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth", origin));
}
