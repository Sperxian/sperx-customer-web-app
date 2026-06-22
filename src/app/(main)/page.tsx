"use client";

import { LoaderCircleIcon } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { fetchGuestMemberLoyalties } from "@/lib/services/guest";
import { useEffect, useState } from "react";
import { MemberLoyalty } from "@/types/domain";
import { getAllMemberLoyalties } from "@/lib/api/member";
import LoyaltyOverviewCard from "./components/LoyaltyOverviewCard";
import "@/app/globals.css";
import { Alert } from "../components/shared/Alert";

export default function IndexPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [loyaltyCards, setLoyaltyCards] = useState<MemberLoyalty[]>([]);

  useEffect(() => {
    if (!isUserLoaded) return;

    (async () => {
      try {
        const data = isSignedIn
          ? await getAllMemberLoyalties()
          : await fetchGuestMemberLoyalties();

        setLoyaltyCards(data);
      } catch (error) {
        // TODO: Add error alert message
        console.error("Failed to load loyalty cards", error);
      }
    })();
  }, [isUserLoaded, isSignedIn]);

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* App Header */}
      <div className="flex justify-end">
        {isUserLoaded && isSignedIn && (
          <div className="flex items-center gap-2">
            <p className="font-bold text-primary">
              {user.fullName ?? user.primaryEmailAddress?.emailAddress}
            </p>
            <UserButton />
          </div>
        )}
        {isUserLoaded && !isSignedIn && (
          <SignInButton mode="modal">
            <button className="bg-primary text-white rounded-2xl px-4 py-1 capitalize">
              Sign in
            </button>
          </SignInButton>
        )}
      </div>

      {/* List of Loyalty Cards */}
      <div className="flex flex-col">
        <p className="text-sm mb-2 text-foreground/50">Loyalty Cards</p>

        {!isUserLoaded ? (
          <div className="flex justify-center items-center">
            <LoaderCircleIcon
              size={48}
              className="animate-spin aspect-square text-primary dark:text-primary-lighter"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {!isSignedIn && <ClaimReminder />}
            <LoyaltyOverviewList cards={loyaltyCards} />
          </div>
        )}
      </div>
    </div>
  );
}

function ClaimReminder() {
  return (
    <div className="flex gap-4 justify-end">
      <Alert
        variant="warning"
        title="Keep your loyalty progress safe"
        message="Guest accounts are stored only on this device. Secure your stamps with an account."
        actionSlot={
          <div className="flex gap-4 justify-end items-center mt-1">
            <SignUpButton mode="modal">
              <button className="text-primary dark:text-primary-lighter font-bold underline capitalize">
                Sign up
              </button>
            </SignUpButton>
            <p>or</p>
            <SignInButton>
              <button className="text-primary dark:text-primary-lighter font-bold underline capitalize">
                Sign in
              </button>
            </SignInButton>
          </div>
        }
      />
    </div>
  );
}

type LoyaltyOverviewListProps = {
  cards?: MemberLoyalty[];
};

function LoyaltyOverviewList({ cards = [] }: LoyaltyOverviewListProps) {
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <LoyaltyOverviewCard key={card.id} {...card} />
      ))}
    </div>
  );
}
