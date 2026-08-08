"use client";

import { LoaderCircleIcon, PackageOpenIcon } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { fetchGuestMemberLoyalties } from "@/lib/services/guest";
import { useEffect, useState } from "react";
import { MemberLoyalty } from "@/types/domain";
import { getAllMemberLoyalties } from "@/lib/api/member";
import LoyaltyOverviewCard from "./components/LoyaltyOverviewCard";
import { Alert } from "../components/shared/Alert";
import Image from "next/image";
import "@/app/globals.css";

export default function IndexPage() {
  const isCustomerLoginEnabled =
    process.env.NEXT_PUBLIC_FEATURE_FLAG_ENABLE_CUSTOMER_LOGIN === "true";

  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [loyaltyCards, setLoyaltyCards] = useState<MemberLoyalty[]>([]);

  useEffect(() => {
    if (!isUserLoaded) return;

    (async () => {
      try {
        const data = isSignedIn
          ? (
              await Promise.all([
                getAllMemberLoyalties(),
                fetchGuestMemberLoyalties(),
              ])
            ).flat()
          : await fetchGuestMemberLoyalties();

        setLoyaltyCards(data);
      } catch (error) {
        // TODO: Add error alert message
        console.error("Failed to load loyalty cards", error);
      }
    })();
  }, [isUserLoaded, isSignedIn]);

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      {/* App Header */}
      <div className="flex justify-between">
        <Image
          className="bg-background aspect-square object-cover"
          src={"/sperx-logo.png"}
          alt="Sperx"
          width={48}
          height={48}
          priority
        />
        {isCustomerLoginEnabled &&
          isUserLoaded &&
          (isSignedIn ? (
            <div className="flex items-center gap-2">
              <p className="font-bold text-primary dark:text-primary-lighter">
                {user.fullName ?? user.primaryEmailAddress?.emailAddress}
              </p>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-primary text-white rounded-2xl px-4 py-1 capitalize">
                Sign in
              </button>
            </SignInButton>
          ))}
      </div>

      {/* List of Loyalty Cards */}
      <div className="flex-1 flex-col overflow-y-auto">
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
            {isCustomerLoginEnabled &&
              !isSignedIn &&
              loyaltyCards.length > 0 && <ClaimReminder />}
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
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center w-full gap-4 p-8">
        <PackageOpenIcon className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] text-primary-lighter dark:text-primary" />
        <span className="text-md font-medium text-foreground/80 text-center">
          {"There aren't any loyalty cards here."}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <LoyaltyOverviewCard key={card.id} {...card} />
      ))}
    </div>
  );
}
