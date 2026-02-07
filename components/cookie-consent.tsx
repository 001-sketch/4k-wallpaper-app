"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const hasConsent = document.cookie.includes("wallscape_cookie_consent=yes");
      if (!hasConsent) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const accept = async () => {
    try {
      await fetch("/api/consent", { method: "POST" });
      setVisible(false);
    } catch (e) {
      console.error("Failed to set consent:", e);
    }
  };

  const decline = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50">
      <div className="glass p-4 rounded-lg flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="flex-1 text-sm text-foreground/90">
          We use cookies to save your download history and improve your experience. Do you
          consent to cookies for this purpose?
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <Button variant="secondary" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
