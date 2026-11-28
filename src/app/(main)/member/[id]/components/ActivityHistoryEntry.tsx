import type { MemberLoyaltyHistoryItem } from "@/types/domain";
import { GiftIcon, WalletIcon } from "lucide-react";
import { LoyaltyStamp } from "@/app/components/widgets/LoyaltyStamp";
import { formatDate, formatTime } from "@/lib/utils/date.utils";
import type { ReactNode } from "react";
import { useMemberLoyalty } from "../MemberContext";
import type { StampBasedConfig } from "@/types/loyalty-program.types";
import { formatNumber } from "@/lib/utils/numeric.utils";

interface ActivityHistoryEntryProps {
  entry: MemberLoyaltyHistoryItem;
}

export function ActivityHistoryEntry({ entry }: ActivityHistoryEntryProps) {
  if (entry.type === "ACCUMULATION") {
    return <AccumulationEntry entry={entry} />;
  }
  if (entry.type === "REDEMPTION") {
    return <RedemptionEntry entry={entry} />;
  }
  if (entry.type === "WALLET_TOP_UP") {
    return <WalletTopUpEntry entry={entry} />;
  }
  if (entry.type === "WALLET_SPEND") {
    return <WalletSpendEntry entry={entry} />;
  }

  return null;
}

interface ActivityEntryContentProps {
  entry: MemberLoyaltyHistoryItem;
}

function ActivityEntryLayout({
  entry,
  leadingIcon,
  children,
}: ActivityEntryContentProps & {
  leadingIcon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex justify-start items-center gap-2 py-2 border-b border-foreground/10">
      {leadingIcon}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm text-primary dark:text-primary-lighter">
            {children}
          </div>
          <p className="shrink-0 whitespace-nowrap text-right text-xs text-foreground/50">
            <span className="block">{formatDate(entry.transactionDate)}</span>
            <span className="block">{formatTime(entry.transactionDate)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AccumulationEntry({ entry }: ActivityEntryContentProps) {
  const icon = useStampIcon();
  const { points } = entry;
  return (
    <ActivityEntryLayout
      entry={entry}
      leadingIcon={
        <span className="inline-flex gap-1 text-primary/80">
          <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <LoyaltyStamp filled size={18} icon={icon} />
          </div>
        </span>
      }
    >
      <span>
        Collected <span className="font-bold">{points}</span>{" "}
        {points === 1 ? "stamp" : "stamps"}
      </span>
    </ActivityEntryLayout>
  );
}

interface RedemptionEntryProps {
  entry: MemberLoyaltyHistoryItem;
}

function RedemptionEntry({ entry }: RedemptionEntryProps) {
  return (
    <ActivityEntryLayout
      entry={entry}
      leadingIcon={
        <span className="inline-flex gap-1 text-primary/80">
          <div className="w-[36px] aspect-square rounded-full border flex items-center justify-center flex-shrink-0">
            <GiftIcon className="text-primary" size={18} />
          </div>
        </span>
      }
    >
      <div className="flex flex-col">
        <p className="text-sm">
          Redeemed reward for{" "}
          <span className="font-bold">{Math.abs(entry.points ?? 0)}</span>{" "}
          stamps
        </p>
        {entry.reward?.name && (
          <p className="text-xs text-foreground/60">Got {entry.reward.name}</p>
        )}
      </div>
    </ActivityEntryLayout>
  );
}

function WalletTopUpEntry({ entry }: ActivityEntryContentProps) {
  const amount = (entry.balance ?? 0) / 100;

  return (
    <ActivityEntryLayout
      entry={entry}
      leadingIcon={
        <span className="inline-flex gap-1 text-primary/80">
          <div className="w-[36px] aspect-square rounded-full border flex items-center justify-center flex-shrink-0">
            <WalletIcon className="text-primary" size={18} />
          </div>
        </span>
      }
    >
      <span>
        Topped up wallet with <span className="font-bold">₱{formatNumber(amount)}</span>
      </span>
    </ActivityEntryLayout>
  );
}

function WalletSpendEntry({ entry }: ActivityEntryContentProps) {
  const icon = useStampIcon();
  const amountDeducted = Math.abs(entry.balance ?? 0) / 100;
  const points = entry.points ?? 0;

  return (
    <ActivityEntryLayout
      entry={entry}
      leadingIcon={
        <span className="inline-flex gap-1 text-primary/80">
          <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <LoyaltyStamp filled size={18} icon={icon} />
          </div>
        </span>
      }
    >
      <div className="flex flex-col">
        <span>
          Collected <span className="font-bold">{points}</span>{" "}
          {points === 1 ? "point" : "points"}
        </span>
        <span className="text-xs text-foreground/60">
          ₱{formatNumber(amountDeducted)} spent from wallet
        </span>
      </div>
    </ActivityEntryLayout>
  );
}

function useStampIcon() {
  const {
    memberLoyalty: {
      loyaltyProgram: { config },
    },
  } = useMemberLoyalty();

  return (config as StampBasedConfig).stampIcon ?? "star";
}
