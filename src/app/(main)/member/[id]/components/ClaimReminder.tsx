"use client";

import { Alert } from "@/app/components/shared/Alert";
import { MemberLoyalty } from "@/types/domain";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  memberLoyalty: MemberLoyalty;
};

export default function ClaimReminder({ memberLoyalty }: Props) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const goToClaimPage = () => {
    router.push(`/member/${memberLoyalty.id}/claim`);
  };

  if (!isLoaded) {
    return null;
  }

  const showSignUpReminder = isSignedIn === false && memberLoyalty.points >= 2;
  const showClaimReminder = isSignedIn === true && !memberLoyalty.isClaimed;

  let metadata;
  if (showSignUpReminder) {
    metadata = {
      title: "Keep your loyalty progress safe",
      message:
        "Guest accounts are stored only on this device. " +
        "Secure your stamps with an account.",
      actionText: "Sign up",
      action: (
        <div className="flex gap-4 justify-end">
          <SignUpButton
            mode="modal"
            forceRedirectUrl={`/member/${memberLoyalty.id}/claim`}
          >
            <button className="text-primary dark:text-primary-lighter font-bold underline mt-1 capitalize">
              Sign up
            </button>
          </SignUpButton>
        </div>
      ),
    };
  } else if (showClaimReminder) {
    metadata = {
      title: "Is this your loyalty card?",
      message: "Secure this loyalty card by linking it to your account.",
      actionText: "Claim this",
      action: (
        <div className="flex gap-4 justify-end">
          <button
            className="text-primary dark:text-primary-lighter font-bold underline mt-1 capitalize"
            onClick={goToClaimPage}
          >
            Claim Now
          </button>
        </div>
      ),
    };
  }

  if (!metadata) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      title={metadata.title}
      message={metadata.message}
      actionSlot={metadata.action}
    />
  );
}
