"use client";

import { useEffect } from "react";
import { trackMetaLead } from "./MetaPixel";
import { trackGoogleAdsConversion } from "./GoogleAdsGtag";

/** Dispara Lead (Meta) e conversão (Google Ads) ao montar (página de obrigado). */
export function ObrigadoPixel() {
  useEffect(() => {
    trackMetaLead();
    trackGoogleAdsConversion();
  }, []);
  return null;
}
