"use client";

import { ChevronRightIcon, LoaderCircleIcon, X } from "lucide-react";
import { LoyaltyStamp } from "./member/[id]/components/LoyaltyStamp";
import { themeCssVars } from "@/lib/theme";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { fetchGuestMemberLoyalties } from "@/lib/services/guest";
import { useEffect, useState } from "react";
import { MemberLoyalty } from "@/types/domain";
import { getAllMemberLoyalties } from "@/lib/api/member";
import "@/app/globals.css";

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
          <LoyaltyOverviewList cards={loyaltyCards} />
        )}
      </div>
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

function LoyaltyOverviewCard(memberLoyalty: MemberLoyalty) {
  const {
    loyaltyProgram: {
      config: {
        stampIcon,
        availableRewards: [{ goalPoints }],
      },
    },
    shop: {
      name: shopName,
      config: { theme },
    },
    points,
  } = memberLoyalty;

  const styles = theme ? themeCssVars(theme) : {};
  const remainingPoints = goalPoints % points;
  const progressPercent = (points / goalPoints) * 10;

  return (
    <div style={styles}>
      <div className="h-full bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="aspect-square rounded-xl min-h-12 flex items-center justify-center relative border-1 border-primary-lighter bg-primary-light">
            <LoyaltyStamp icon={stampIcon} filled size={32} />
          </div>
          <p className="tracking-widest text-secondary text-xl">{shopName}</p>
        </div>

        <div className="bg-secondary-darkest rounded-full overflow-hidden">
          <div
            className="h-1 bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="h-8 overflow-hidden">
          <div
            className={[
              "flex justify-between absolute bottom-0 left-0 right-0 p-4",
              "bg-gradient-to-r from-primary via-primary-dark/75 via-primary-darker/30 to-primary-darkest",
            ].join(" ")}
          >
            <p className="text-sm text-white">
              {remainingPoints} points more for next reward
            </p>
            <ChevronRightIcon color="white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
