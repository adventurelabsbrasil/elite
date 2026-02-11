"use client";

import { useEffect } from "react";
import { trackMetaLead } from "./MetaPixel";

/** Dispara evento Lead do Meta Pixel ao montar (página de obrigado). */
export function ObrigadoPixel() {
  useEffect(() => {
    trackMetaLead();
  }, []);
  return null;
}
