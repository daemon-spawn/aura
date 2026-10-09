type Gtag = (...args: unknown[]) => void;

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Send a GA4 event if analytics is configured. Safe to call anywhere on the client. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
}
