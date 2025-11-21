"use client";

import { useEffect, useState } from "react";

export default function MobileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setBlocked(true);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (blocked) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>DreamPlay is not supported on mobile devices.</h2>
        <p>Please use a tablet, laptop, or desktop.</p>
      </div>
    );
  }

  return <>{children}</>;
}
