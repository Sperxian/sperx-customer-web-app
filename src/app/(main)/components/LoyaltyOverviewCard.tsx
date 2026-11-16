import { MemberLoyalty } from "@/types/domain";
import StampLoyaltyOverviewCard from "./StampLoyaltyOverviewCard";
import WalletLoyaltyOverviewCard from "./WalletLoyaltyOverviewCard";

type LoyaltyOverviewCardProps = {
  memberLoyalty: MemberLoyalty;
};

export default function LoyaltyOverviewCard({
  memberLoyalty,
}: LoyaltyOverviewCardProps) {
  if (memberLoyalty.loyaltyProgram.type === "STAMP_BASED") {
    return <StampLoyaltyOverviewCard memberLoyalty={memberLoyalty} />;
  } else if (memberLoyalty.loyaltyProgram.type === "WALLET_BASED") {
    return <WalletLoyaltyOverviewCard memberLoyalty={memberLoyalty} />;
  }

  return null;
}
