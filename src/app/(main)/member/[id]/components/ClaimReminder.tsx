"use client";

import { Alert } from "@/app/components/shared/Alert";
import { MemberLoyalty } from "@/types/domain";
import { SignUpButton, useUser } from "@clerk/nextjs";

type Props = {
  memberLoyalty: MemberLoyalty;
};

export default function ClaimReminder({ memberLoyalty }: Props) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  const showSignUpReminder = isSignedIn === false && memberLoyalty.points >= 2;

  let metadata;
  // TODO: If signed in, but member loyalty has not yet been claimed!
  if (showSignUpReminder) {
    metadata = {
      message:
        "Guest accounts are stored only on this device. " +
        "Secure your stamps with an account.",
      actionText: "Sign up",
    };
  }

  if (!metadata) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      title="Keep your loyalty progress safe"
      message={metadata.message}
      actionSlot={
        <div className="flex gap-4 justify-end">
          <SignUpButton
            mode="modal"
            forceRedirectUrl={`/member/${memberLoyalty.id}/claim`}
          >
            <button className="text-primary font-bold underline mt-1 capitalize">
              {metadata.actionText}
            </button>
          </SignUpButton>
        </div>
      }
    />
  );
}
