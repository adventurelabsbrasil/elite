"use client";

import { useEffect } from "react";
import { trackViewContent } from "./MetaPixel";

/** Dispara ViewContent ao montar (usar só na homepage). */
export function ViewContentPixel() {
  useEffect(() => {
    trackViewContent();
  }, []);
  return null;
}
