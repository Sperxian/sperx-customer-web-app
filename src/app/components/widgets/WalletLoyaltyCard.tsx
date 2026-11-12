import { ArrowRightIcon, SparklesIcon, WalletIcon } from "lucide-react";
import type { MemberLoyalty } from "@/types/domain";
import { WalletBasedConfig } from "@/types/loyalty-program.types";

type WalletLoyaltyCardProps = {
  memberLoyalty: MemberLoyalty;
};

export function WalletLoyaltyCard({ memberLoyalty }: WalletLoyaltyCardProps) {
  const { loyaltyProgram } = memberLoyalty;
  const config = loyaltyProgram.config as WalletBasedConfig;

  if (memberLoyalty.loyaltyProgram.type !== "WALLET_BASED") {
    throw new Error("Wallet loyalty card requires wallet-based configuration.");
  }

  const rewardConfig = config.availableRewards[0];
  const total = rewardConfig.goalPoints;
  const points = Number.isFinite(memberLoyalty.points)
    ? Math.max(memberLoyalty.points, 0)
    : 0;
  const progressPoints = Math.min(points, total);
  const remainingPoints = Math.max(total - points, 0);
  const progressPercent =
    total > 0 ? Math.min((progressPoints / total) * 100, 100) : 0;
  const spendAmount = (config.convertibleAmountCents / 100).toFixed(2);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark p-5 text-white shadow-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border-[24px] border-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full border-[20px] border-white/5"
      />

      <div className="relative flex items-center justify-start gap-4">
        <WalletIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="truncate text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
          {loyaltyProgram.name}
        </p>
      </div>

      <div className="relative mt-5 flex flex-row justify-between gap-3">
        <div className="flex flex-col w-1/2">
          <p className="text-xs font-medium text-white/70">Wallet Balance</p>
          <p className="mt-0.5 text-3xl font-bold leading-none tracking-tight">
            ₱ 232.50
          </p>
        </div>
        <div className="flex flex-col w-1/2 text-right">
          <p className="text-xs font-medium text-white/70">
            Accumulated Points
          </p>
          <p className="mt-0.5 text-3xl font-bold leading-none tracking-tight">
            {Math.trunc(points)}
            <span className="ml-1.5 text-sm font-semibold text-white/70">
              pts
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-full mt-4 items-center justify-center rounded-lg border border-white/10 bg-white/10 px-2.5 py-2 text-right text-xs font-medium leading-tight text-white/90">
        <span>Every ₱{spendAmount} spent</span>
        <ArrowRightIcon
          className="h-3.5 w-3.5 shrink-0 text-white/60"
          aria-hidden="true"
        />
        <span className="text-secondary">+{config.pointsAwarded} pts</span>
      </div>

      <div className="relative mt-auto pt-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-white/90">
            {remainingPoints > 0
              ? `${remainingPoints} points to ${rewardConfig.name}`
              : `${rewardConfig.name} earned!`}
          </span>
          <span className="shrink-0 text-white/70">
            {Math.trunc(progressPoints)} / {total} points
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={`Progress toward ${rewardConfig.name}`}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={Math.trunc(progressPoints)}
          className="h-2 overflow-hidden rounded-full bg-black/20"
        >
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-white/65">
          <SparklesIcon className="h-3 w-3" aria-hidden="true" />
          <span>Reward at {total} points</span>
        </div>
      </div>
    </div>
  );
}
