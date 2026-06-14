"use client";

import { useUser } from "@clerk/nextjs";
import { LoyaltyCardSection } from "../components/LoyaltyCardSection";
import { LinkIcon, LoaderCircleIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/app/components/shared/Alert";
import { useMemberLoyalty } from "../MemberContext";

export default function ClaimMemberLoyaltyPage() {
  const { id: memberId } = useParams();
  const memberLoyalty = useMemberLoyalty();
  const router = useRouter();
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();

  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string>();

  const email = user?.primaryEmailAddress?.toString();

  const linkMember = async () => {
    setIsLinking(true);
    try {
      const response = await fetch(`/api/members/${memberId}/claim`, {
        method: "post",
      });

      const data = await response.json();

      if (response.ok) {
        goToMemberPage();
        return;
      }

      setLinkError(data.message || "An unexpected error has occured.");
    } finally {
      setIsLinking(false);
    }
  };

  const goToMemberPage = () => {
    router.replace(`/member/${memberId}`);
  };

  const goBack = () => {
    router.back();
  };

  if (memberLoyalty.isClaimed) {
    return goToMemberPage();
  }

  if (!isUserLoaded) {
    return <LoaderCircleIcon className="animate-spin" />;
  }

  if (!isSignedIn) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="text-xl font-bold capitalize">
        Claim this loyalty card
      </div>

      {linkError && (
        <Alert
          variant="error"
          title="Error While Claiming Member"
          message={linkError}
          actionSlot={
            <div className="w-full flex justify-end">
              <button
                className="text-primary dark:text-primary-lighter font-bold underline mt-1 capitalize"
                onClick={() => goBack()}
              >
                Go back
              </button>
            </div>
          }
        />
      )}

      <div className="text-sm text-foreground">
        We found this loyalty card stored on this device. Link it to your
        current account to access it across all your devices. Never lose your
        progress!
      </div>
      <LoyaltyCardSection />

      {isUserLoaded && (
        <div className="flex flex-col gap-2">
          <button
            className="bg-primary disabled:bg-primary/80 text-white p-4 rounded-lg w-full inline-flex items-center justify-center gap-2"
            disabled={isLinking}
            onClick={linkMember}
          >
            {!isLinking ? (
              <LinkIcon size={18} />
            ) : (
              <LoaderCircleIcon
                size={18}
                className="animate-spin aspect-square text-secondary/80 rounded-xl"
              />
            )}
            <div className="text-md uppercase font-medium tracking-wide">
              Claim This Member
            </div>
          </button>
          <div className="text-xs w-full text-center">({email})</div>
        </div>
      )}
    </div>
  );
}
