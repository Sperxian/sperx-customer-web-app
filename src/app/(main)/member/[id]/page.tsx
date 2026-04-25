import { ActivityHistorySection } from "@/components/member/ActivityHistorySection";
import { HowItWorksSection } from "@/components/member/HowItWorksSection";
import { LoyaltyCardSection } from "@/components/member/LoyaltyCardSection";
import { getMemberPointsHistory } from "@/lib/api/member";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}
export default async function MemberPage({ params }: PageParams) {
  const { id: memberId } = await params;
  const history = await getMemberPointsHistory(memberId);

  return (
    <div className="grid gap-8 p-4">
      <LoyaltyCardSection />
      {history && history.items.length === 0 && <HowItWorksSection />}
      {history && <ActivityHistorySection history={history} />}
    </div>
  );
}
