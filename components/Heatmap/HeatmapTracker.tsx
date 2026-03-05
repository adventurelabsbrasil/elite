"use client";

import { useEffect } from "react";

const HEATMAP_SESSION_KEY = "elite_heatmap_session_id";
const ALLOWED_PATHS = ["/", "/obrigado"];

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(HEATMAP_SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(HEATMAP_SESSION_KEY, id);
  }
  return id;
}

function sendClick(pathname: string, clientX: number, clientY: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x_pct = Math.min(100, Math.max(0, (clientX / vw) * 100));
  const y_pct = Math.min(100, Math.max(0, (clientY / vh) * 100));

  fetch("/api/heatmap/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pathname,
      x_pct: Math.round(x_pct * 100) / 100,
      y_pct: Math.round(y_pct * 100) / 100,
      viewport_width: vw,
      viewport_height: vh,
      session_id: getSessionId(),
    }),
  }).catch(() => {});
}

export function HeatmapTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const pathname = window.location.pathname;
      if (!ALLOWED_PATHS.includes(pathname)) return;
      sendClick(pathname, e.clientX, e.clientY);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
