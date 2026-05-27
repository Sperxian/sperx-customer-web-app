"use client";

import { ActivityHistorySection } from "@/app/(main)/member/[id]/components/ActivityHistorySection";
import { HowItWorksSection } from "@/app/(main)/member/[id]/components/HowItWorksSection";
import { LoyaltyCardSection } from "@/app/(main)/member/[id]/components/LoyaltyCardSection";
import { Alert } from "@/app/components/shared/Alert";
import { getMemberPointsHistory } from "@/lib/api/member";
import { useMemberLoyalty } from "./MemberContext";
import { useEffect, useState } from "react";
import { MemberPointsHistory } from "@/types/domain";
import { SignUpButton, useUser } from "@clerk/nextjs";

export default function MemberPage() {
  const memberLoyalty = useMemberLoyalty();
  const { isSignedIn } = useUser();
  const [history, setHistory] = useState<MemberPointsHistory | null>();

  useEffect(() => {
    async function fetchHistory() {
      const data = await getMemberPointsHistory(memberLoyalty.id);
      setHistory(data);
    }

    fetchHistory();
  }, [memberLoyalty]);

  const showSignUpReminder = isSignedIn === false && memberLoyalty.points >= 2;

  const signUpReminder = (
    <Alert
      variant="warning"
      message="Guest accounts are stored only on this device. Secure your stamps with an account."
      actionSlot={
        <div className="flex gap-4 justify-end">
          <SignUpButton mode="modal">
            <button className="text-primary font-bold underline mt-1 capitalize">
              Sign up
            </button>
          </SignUpButton>
        </div>
      }
    />
  );

  return (
    <div className="grid gap-4 p-4">
      {showSignUpReminder && signUpReminder}
      <LoyaltyCardSection />
      {history && history.items.length === 0 && <HowItWorksSection />}
      {history && <ActivityHistorySection history={history} />}
    </div>
  );
}
