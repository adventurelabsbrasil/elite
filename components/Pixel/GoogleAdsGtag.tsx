"use client";

import Script from "next/script";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/** send_to da ação de conversão "Visualização de página (1)" no Google Ads */
const CONVERSION_SEND_TO = "AW-17970089114/TNueCNCenv0bEJqZ5_hC";

export function GoogleAdsGtag() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script
        id="google-ads-gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `,
        }}
      />
    </>
  );
}

function getGtag() {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
}

/** Dispara conversão "Visualização de página" na página de obrigado. */
export function trackGoogleAdsConversion() {
  const gtag = getGtag();
  if (gtag) {
    gtag("event", "conversion", {
      send_to: CONVERSION_SEND_TO,
      value: 1.0,
      currency: "BRL",
    });
  }
}
