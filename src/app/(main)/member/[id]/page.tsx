"use client";

import { ActivityHistorySection } from "@/components/member/ActivityHistorySection";
import { HowItWorksSection } from "@/components/member/HowItWorksSection";
import {
  LoyaltyCardData,
  LoyaltyCardSection,
} from "@/components/member/LoyaltyCardSection";
import { getMemberLoyalty, getMemberPointsHistory } from "@/lib/api/member";
import { MemberPointsHistory } from "@/types/domain";
import { use, useEffect, useState } from "react";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default function MemberPage({ params }: PageParams) {
  const { id: memberId } = use(params);
  // TODO: Get shop name and etc.
  const [card, setCard] = useState<LoyaltyCardData | null>(null);
  const [history, setHistory] = useState<MemberPointsHistory | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberLoyalty = await getMemberLoyalty(memberId);

        if (!memberLoyalty) {
          console.warn("No member loyalty data found");
          return;
        }

        const historyResponse = await getMemberPointsHistory(memberId);
        setHistory(historyResponse);

        setCard({
          memberId: memberLoyalty.id,
          loyaltyProgramName: memberLoyalty.loyaltyProgram.name,
          totalStamps: memberLoyalty.loyaltyProgram.config.goalPoints,
          collectedStamps: memberLoyalty.points,
          rewardDescription: memberLoyalty.loyaltyProgram.config.reward,
        });
      } catch (error) {
        console.error("Failed to fetch member loyalty:", error);
      }
    };

    fetchMember();
  }, [memberId]);

  return (
    <div className="grid gap-8 p-4">
      {card && <LoyaltyCardSection card={card} />}
      {(history && history.items.length === 0) && <HowItWorksSection />}
      {history && <ActivityHistorySection history={history} />}
    </div>
  );
}
