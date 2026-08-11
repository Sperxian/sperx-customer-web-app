"use client";

import { ActivityHistorySection } from "@/app/(main)/member/[id]/components/ActivityHistorySection";
import { HowItWorksSection } from "@/app/(main)/member/[id]/components/HowItWorksSection";
import { LoyaltyCardSection } from "@/app/(main)/member/[id]/components/LoyaltyCardSection";
import { getMemberPointsHistory } from "@/lib/api/member";
import { useMemberLoyalty } from "./MemberContext";
import { useEffect, useState } from "react";
import { MemberPointsHistory } from "@/types/domain";
import { themeCssVars } from "@/lib/theme";
import ClaimReminder from "./components/ClaimReminder";
import { Alert } from "@/app/components/shared/Alert";

export default function MemberPage() {
  const { memberLoyalty } = useMemberLoyalty();
  const [history, setHistory] = useState<MemberPointsHistory | null>();

  const { theme } = memberLoyalty.shop.config;
  const themeVars = theme ? themeCssVars(theme) : undefined;

  useEffect(() => {
    async function fetchHistory() {
      const data = await getMemberPointsHistory(memberLoyalty.id);
      setHistory(data);
    }

    if (memberLoyalty) {
      fetchHistory();
    }
  }, [memberLoyalty]);

  const minimumGoalPoints = memberLoyalty.loyaltyProgram.config.availableRewards
    .map((reward) => reward.goalPoints)
    .reduce((min, curr) => Math.min(min, curr), Infinity);
    
  const canClaimReward = memberLoyalty.points >= minimumGoalPoints;

  return (
    <div className="flex-1 relative overflow-hidden" style={themeVars}>
      <main className="h-full overflow-y-auto">
        <div className="grid gap-4 p-4">
          <ClaimReminder memberLoyalty={memberLoyalty} />
          {canClaimReward && <Alert
            variant="info"
            title="🎉 Your reward awaits."
            message="You've earned a reward. Claim it now! 🎁"
          />}
          <LoyaltyCardSection />
          {history && history.items.length === 0 && <HowItWorksSection />}
          {history && <ActivityHistorySection history={history} />}
        </div>
      </main>

      {/* bottom fade indicator */}
      <div
        className={[
          "pointer-events-none absolute bottom-0 left-0 right-0 h-15",
          "bg-gradient-to-t from-background via-background/75 via-background/30 to-transparent",
        ].join(" ")}
      />
    </div>
  );
}
