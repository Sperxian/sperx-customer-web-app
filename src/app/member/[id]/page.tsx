'use client';

import { ActivityHistorySection } from "@/components/member/ActivityHistorySection";
import { LoyaltyCardData, LoyaltyCardSection } from "@/components/member/LoyaltyCardSection";
import { getMember } from "@/lib/api/member";
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
      const memberData = await getMember(memberId);
      setCard({
        memberId: memberData.memberId,
        loyaltyProgramName: memberData.loyaltyProgramName,  
        totalStamps: memberData.totalStamps,
        collectedStamps: memberData.collectedStamps,
        rewardDescription: memberData.rewardDescription,
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
