'use client';

import { ActivityHistorySection } from "@/components/member/ActivityHistorySection";
import { LoyaltyCardData, LoyaltyCardSection } from "@/components/member/LoyaltyCardSection";
import { getMemberLoyalty } from "@/lib/api/member";
import { EXISTING_MEMBER } from "@/lib/stubs";
import { use, useEffect, useState } from "react";

interface PageParams {
  params: Promise<{
    id: string
  }>;
}

export default function MemberPage({ params }: PageParams) {
  const { activityHistory } = EXISTING_MEMBER;
  const { id: memberId } = use(params)

  const [card, setCard] = useState<LoyaltyCardData | null>(null);

  useEffect(() => {
    const fetchMember = async() => {
      console.log("Fetching member data for memberId:", memberId);
      const memberLoyalty = await getMemberLoyalty(memberId);

      console.log({ memberData: memberLoyalty });
      if (!memberLoyalty) {
        console.warn("No member loyalty data found, using stub data");
        return;
      }

      setCard({
        memberId: memberLoyalty.id,
        loyaltyProgramName: memberLoyalty.loyaltyProgram.name,
        totalStamps: memberLoyalty.loyaltyProgram.config.goalPoints,
        collectedStamps: memberLoyalty.points,
        rewardDescription: memberLoyalty.loyaltyProgram.config.reward,
      });
    }

    fetchMember();
  }, [memberId]);


  return (
    <div className="grid gap-8 p-4">
      {card && <LoyaltyCardSection card={card} />}
      {activityHistory &&<ActivityHistorySection entries={activityHistory} />}
    </div>
  );
}
