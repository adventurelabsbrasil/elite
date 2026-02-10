"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-elite-flow/90 text-white shadow-lg transition hover:bg-elite-flow focus:outline-none focus:ring-2 focus:ring-elite-flow focus:ring-offset-2 focus:ring-offset-elite-navy"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
