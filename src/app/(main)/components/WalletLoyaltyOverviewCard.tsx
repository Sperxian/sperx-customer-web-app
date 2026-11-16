"use client";

import { themeCssVars } from "@/lib/theme";
import type { MemberLoyalty } from "@/types/domain";
import type { WalletBasedConfig } from "@/types/loyalty-program.types";
import { ChevronRightIcon, WalletIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type WalletLoyaltyOverviewCardProps = {
  memberLoyalty: MemberLoyalty;
};

export default function WalletLoyaltyOverviewCard({
  memberLoyalty,
}: WalletLoyaltyOverviewCardProps) {
  const router = useRouter();

  if (memberLoyalty.loyaltyProgram.type !== "WALLET_BASED") {
    throw new Error(
      "Wallet loyalty overview requires wallet-based configuration.",
    );
  }

  const {
    id: memberId,
    loyaltyProgram: { name: loyaltyProgramName, config },
    shop: {
      name: shopName,
      config: { theme },
    },
    points,
    walletBalance,
    isClaimed,
  } = memberLoyalty;

  const { availableRewards } = config as WalletBasedConfig;
  const reward = availableRewards[0];
  const totalPoints = reward.goalPoints;
  const currentPoints = Number.isFinite(points) ? Math.max(points, 0) : 0;
  const progressPoints = Math.min(currentPoints, totalPoints);
  const remainingPoints = Math.max(totalPoints - currentPoints, 0);
  const progressPercent =
    totalPoints > 0 ? (progressPoints / totalPoints) * 100 : 0;
  const styles = theme ? themeCssVars(theme) : {};
  const balance = ((walletBalance ?? 0) / 100).toFixed(2);

  const goToMemberPage = () => {
    router.push(`/member/${memberId}`);
  };

  return (
    <div style={styles}>
      <div className="h-full bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="aspect-square rounded-xl min-h-12 flex items-center justify-center relative border-1 border-primary-lighter bg-primary-light">
              <WalletIcon size={32} color="var(--secondary)" />
            </div>
            <div className="flex flex-col gap-0 min-w-0">
              <p className="text-white text-md">{loyaltyProgramName}</p>
              <p className="text-white/70 text-sm">{shopName}</p>
            </div>
          </div>
          {!isClaimed && (
            <div className="bg-secondary text-white text-sm rounded-2xl px-4 py-1 capitalize">
              Guest
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-white/70">Wallet balance</p>
            <p className="truncate text-xl font-semibold text-white">
              <span className="text-sm font-normal">₱</span> {balance}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-white/70">Points</p>
            <p className="truncate text-xl font-semibold text-white">
              {Math.trunc(currentPoints)}
              <span className="text-sm font-normal"> pts</span>
            </p>
          </div>
        </div>

        <div className="bg-secondary-darkest rounded-full overflow-hidden">
          <div
            className="h-1 bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="h-8 overflow-hidden">
          <div
            className={[
              "flex justify-between absolute bottom-0 left-0 right-0 p-4",
              "bg-gradient-to-r from-primary via-primary-dark/75 via-primary-darker/30 to-primary-darkest",
            ].join(" ")}
            onClick={goToMemberPage}
          >
            <p className="text-sm text-white">
              {remainingPoints > 0
                ? `${remainingPoints} points more for next reward`
                : `${reward.name} earned!`}
            </p>
            <ChevronRightIcon color="white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
