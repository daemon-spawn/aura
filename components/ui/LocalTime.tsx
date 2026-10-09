"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Live Johannesburg time — answers "is he working right now?" for clients in
 * other time zones. Renders the zone label on the server, the time on the client.
 */
export function LocalTime({ withZone = true, className }: { withZone?: boolean; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <time suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
        {time ?? "--:--"}
      </time>
      {withZone && <> {site.tzLabel}</>}
    </span>
  );
}
