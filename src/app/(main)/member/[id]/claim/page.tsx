"use client";

import { useUser } from "@clerk/nextjs";
import { LoyaltyCardSection } from "../components/LoyaltyCardSection";
import { LinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default function ClaimMemberLoyaltyPage() {
  const { isLoaded: isUserLoaded, isSignedIn,  user } = useUser();

  if (isUserLoaded && !isSignedIn) {
    return notFound();
  }

  const email = user?.primaryEmailAddress?.toString();

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="text-xl font-bold capitalize">
        Claim this loyalty card
      </div>

      <div className="text-sm text-foreground">
        We found this loyalty card stored on this device. Link it to your
        current account to access it across all your devices. Never lose your
        progress!
      </div>
      <LoyaltyCardSection />

      {isUserLoaded && (
        <div className="flex flex-col gap-2">
          <button
            className="bg-primary hover:bg-primary/80 text-white p-4 rounded-lg w-full inline-flex items-center justify-center gap-2"
            onClick={() => {}}
          >
            <LinkIcon size={18} />
            Claim it under {email}
          </button>
          {/* <div className="mt-4 flex flex-col text-sm text-foreground/80">
          <span>Skip claiming this loyalty card?</span>
          <span>Logout</span>
        </div> */}
        </div>
      )}
    </div>
  );
}
