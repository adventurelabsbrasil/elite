"use client";

import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

function getFbq() {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: (a: string, b: string, c?: object) => void }).fbq;
}

/** ViewContent = viu a página (homepage). */
export function trackViewContent() {
  if (!META_PIXEL_ID) return;
  const fbq = getFbq();
  if (fbq) fbq("track", "ViewContent", { content_name: "LP ELITE" });
}

/** Lead = inscrição (página de obrigado). */
export function trackMetaLead() {
  if (!META_PIXEL_ID) return;
  const fbq = getFbq();
  if (fbq) fbq("track", "Lead");
}

/** Conversão de pipeline: dispara quando o lead avança para estágio marcado como conversão no admin. */
export function trackPipelineConversion(leadId: string, stageLabel: string) {
  if (!META_PIXEL_ID) return;
  const fbq = getFbq();
  if (fbq) {
    fbq("track", "Lead", {
      content_name: stageLabel,
      content_category: "pipeline",
      lead_id: leadId,
    });
  }
}
