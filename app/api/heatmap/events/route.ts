import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_PATHS = ["/", "/obrigado"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pathname,
      x_pct,
      y_pct,
      viewport_width,
      viewport_height,
      session_id,
    } = body;

    if (typeof pathname !== "string" || !ALLOWED_PATHS.includes(pathname)) {
      return NextResponse.json(
        { error: "pathname must be one of: " + ALLOWED_PATHS.join(", ") },
        { status: 400 }
      );
    }

    const x = Number(x_pct);
    const y = Number(y_pct);
    if (Number.isNaN(x) || Number.isNaN(y) || x < 0 || x > 100 || y < 0 || y > 100) {
      return NextResponse.json(
        { error: "x_pct and y_pct must be numbers between 0 and 100" },
        { status: 400 }
      );
    }

    const vw = Number(viewport_width);
    const vh = Number(viewport_height);
    if (!Number.isInteger(vw) || vw < 1 || vw > 10000 || !Number.isInteger(vh) || vh < 1 || vh > 10000) {
      return NextResponse.json(
        { error: "viewport_width and viewport_height must be integers 1–10000" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("heatmap_events").insert({
      pathname,
      x_pct: x,
      y_pct: y,
      viewport_width: vw,
      viewport_height: vh,
      session_id: typeof session_id === "string" ? session_id : null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
