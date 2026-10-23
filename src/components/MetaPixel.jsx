"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { trackMetaPixelEvent } from "@/lib/meta-pixel";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const validPixelId = pixelId && /^\d+$/.test(pixelId) ? pixelId : null;

export default function MetaPixel() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      trackMetaPixelEvent("PageView");
    }

    previousPathname.current = pathname;
  }, [pathname]);

  if (!validPixelId) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html:
          `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(validPixelId)});fbq('track','PageView');window.__metaPixelInitialized=true;if(window.__metaPixelQueue){window.__metaPixelQueue.forEach(function(event){if(event[1]===undefined){fbq('track',event[0])}else{fbq('track',event[0],event[1])}});window.__metaPixelQueue.length=0}`,
      }}
    />
  );
}

export function MetaPixelEvent({ eventName, payload }) {
  const eventKey = JSON.stringify([eventName, payload]);
  const lastEventKey = useRef();

  useEffect(() => {
    if (lastEventKey.current === eventKey) return;

    lastEventKey.current = eventKey;
    trackMetaPixelEvent(eventName, payload);
  }, [eventKey, eventName, payload]);

  return null;
}
