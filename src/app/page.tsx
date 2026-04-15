'use client';

import { ActivityHistorySection } from "@/components/member/ActivityHistorySection";
import { LoyaltyCardSection } from "@/components/member/LoyaltyCardSection";
import { EXISTING_MEMBER } from "@/lib/stubs";

export default function Home() {
  const { card, activityHistory }= EXISTING_MEMBER;

  return (
    <div className="grid gap-8 p-4">
      <LoyaltyCardSection card={card} />
      <ActivityHistorySection entries={activityHistory} />
    </div>
  );
}
