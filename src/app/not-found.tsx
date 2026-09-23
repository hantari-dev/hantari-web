"use client";

import Link from "next/link";

// Fallback for requests that don't match any locale (rare: the proxy adds one).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F4F2ED", color: "#191A1C", padding: 48 }}>
        <h1>Page not found</h1>
        <Link href="/">Go to the homepage</Link>
      </body>
    </html>
  );
}
