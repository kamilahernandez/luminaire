"use client";

import { Button } from "@/components/core/Button";
import { useNewsletterPopup } from "@/components/marketing/NewsletterPopupProvider";

export function NewsletterCTAButton({ label }: { label: string }) {
  const { open } = useNewsletterPopup();
  return (
    <Button type="button" variant="primary" size="md" onClick={open}>
      {label}
    </Button>
  );
}
