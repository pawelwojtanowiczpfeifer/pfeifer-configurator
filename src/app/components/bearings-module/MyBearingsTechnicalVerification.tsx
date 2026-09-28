"use client";

import { useState, type ReactNode } from "react";
import MyButton from "@/app/components/ui/MyButton";

type MyBearingsTechnicalVerificationProps = {
  children: ReactNode;
};

export default function MyBearingsTechnicalVerification({
  children,
}: MyBearingsTechnicalVerificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <MyButton
          variant="secondary"
          size="small"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          Technical verification
        </MyButton>
        <span className="text-xs text-zinc-500">
          Show debug data for engineering review
        </span>
      </div>
      {isOpen ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
