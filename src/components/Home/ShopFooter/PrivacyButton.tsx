"use client";

import PrivacyPolicy from "@/components/PrivacyPolicy";
import { useState } from "react";

export default function PrivacyButton({
  isProductSlug,
}: {
  isProductSlug?: boolean;
}) {
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div>
      {isPrivacyOpen && <PrivacyPolicy setOpen={setPrivacyOpen} />}
      <button
        onClick={() => setPrivacyOpen(!isPrivacyOpen)}
        className="text-sm hover:text-white transition-colors block"
      >
        Polityka prywatności
      </button>
    </div>
  );
}
