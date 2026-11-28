"use client";

import { Alert } from "@/app/components/shared/Alert";
import { MemberLoyalty } from "@/types/domain";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  memberLoyalty: MemberLoyalty;
};

export default function ClaimReminder({ memberLoyalty }: Props) {
  const isCustomerLoginEnabled =
    process.env.NEXT_PUBLIC_FEATURE_FLAG_ENABLE_CUSTOMER_LOGIN === "true";

  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isCustomerLoginEnabled || !isLoaded) {
    return null;
  }

  const goToClaimPage = () => {
    router.push(`/member/${memberLoyalty.id}/claim`);
  };

  const showSignUpReminder = isSignedIn === false && memberLoyalty.points >= 2;
  const showClaimReminder = isSignedIn === true && !memberLoyalty.isClaimed;

  let metadata;
  if (showSignUpReminder) {
    metadata = {
      title: "Keep your loyalty progress safe",
      message: (
        <>
          <SignUpButton
            mode="modal"
            forceRedirectUrl={`/member/${memberLoyalty.id}/claim`}
          >
            <button className="ml-1 text-primary dark:text-primary-lighter font-bold underline">
              Sign up now
            </button>
          </SignUpButton>
          <span> to secure your loyalty card.</span>
        </>
      ),
    };
  } else if (showClaimReminder) {
    metadata = {
      title: "Is this your loyalty card?",
      message: (
        <>
          <button
            className="ml-1 text-primary dark:text-primary-lighter font-bold underline"
            onClick={goToClaimPage}
          >
            Claim this now
          </button>
          <span> to secure your loyalty card.</span>
        </>
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
      dismissible
    />
  );
}
