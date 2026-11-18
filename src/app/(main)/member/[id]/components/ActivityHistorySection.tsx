import { MemberLoyaltyHistoryItem, Paginated } from "@/types/domain";
import { LoyaltyStamp } from "../../../../components/widgets/LoyaltyStamp";
import { formatDateTime } from "@/lib/utils/date.utils";
import { GiftIcon } from "lucide-react";
import { useMemberLoyalty } from "../MemberContext";
import { StampBasedConfig } from "@/types/loyalty-program.types";

interface ActivityHistoryProps {
  history: Paginated;
}

export function ActivityHistorySection({ history }: ActivityHistoryProps) {
  console.log({ history });
  const {
    memberLoyalty: {
      loyaltyProgram: { config },
    },
  } = useMemberLoyalty();
  const { stampIcon = "star" } = config as StampBasedConfig;
  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">
        Recent activity
      </p>

      {history.items.length > 0 ? (
        history.items.map((entry, i) => {
          const isLast = i === history.items.length - 1;
          return (
            <ActivityHistoryEntry
              key={i}
              entry={entry}
              isLast={isLast}
              icon={stampIcon}
            />
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="aspect-square rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0 p-4">
            <LoyaltyStamp icon={stampIcon} filled={false} size={24} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-md text-primary dark:text-primary-lighter">
              No stamps yet
            </p>
            <p className="text-xs text-foreground/60">
              Your activity will appear here after your first stamp.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface ActivityHistoryEntryProps {
  entry: MemberLoyaltyHistoryItem;
  icon: string;
  isLast: boolean;
}

export function ActivityHistoryEntry({
  entry,
  icon,
  isLast,
}: ActivityHistoryEntryProps) {
  const { points } = entry;

  return (
    <div
      className={`flex justify-start items-center gap-2 py-2 ${
        !isLast ? "border-b border-foreground/10" : ""
      }`}
    >
      <span className="inline-flex gap-1 items-centers text-primary/80">
        {entry.type === "ACCUMULATION" ? (
          <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <LoyaltyStamp filled size={18} icon={icon} />
          </div>
        ) : (
          <div className="w-[36px] aspect-square rounded-full border flex items-center justify-center flex-shrink-0">
            <GiftIcon className="text-primary" size={18} />
          </div>
        )}
      </span>
      <div>
        <p className="text-sm text-primary dark:text-primary-lighter">
          {entry.type === "ACCUMULATION" ? (
            <span>
              Collected <span className="font-bold">{points}</span>{" "}
              {points === 1 ? "stamp" : "stamps"}
            </span>
          ) : (
            <span>
              Redeemed free reward for{" "}
              <span className="font-bold">{Math.abs(points ?? 0)}</span> stamps
            </span>
          )}
        </p>
        <p className="text-xs text-foreground/50">
          {formatDateTime(entry.transactionDate)}
        </p>
      </div>
    </div>
  );
}
