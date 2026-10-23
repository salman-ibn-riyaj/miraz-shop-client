export function trackMetaPixelEvent(eventName, payload) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || !/^\d+$/.test(pixelId) || typeof window === "undefined") {
    return;
  }

  if (!window.__metaPixelInitialized || typeof window.fbq !== "function") {
    window.__metaPixelQueue = window.__metaPixelQueue || [];
    window.__metaPixelQueue.push([eventName, payload]);
    return;
  }

  if (payload === undefined) {
    window.fbq("track", eventName);
  } else {
    window.fbq("track", eventName, payload);
  }
}
