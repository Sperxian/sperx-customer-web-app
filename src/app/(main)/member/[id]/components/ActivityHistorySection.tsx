import { MemberPointsHistory } from "@/types/domain";
import { MemberPointTransaction } from "@/types/domain";
import { MemberLoyaltyStamp } from "./LoyaltyStamp";
import { formatDateTime } from "@/lib/utils/date.utils";
import { GiftIcon } from "lucide-react";

interface ActivityHistoryProps {
  history: MemberPointsHistory;
}

export function ActivityHistorySection({ history }: ActivityHistoryProps) {
  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">
        Recent activity
      </p>

      {history.items.length > 0 ? (
        history.items.map((entry, i) => {
          const isLast = i === history.items.length - 1;
          return <ActivityHistoryEntry key={i} entry={entry} isLast={isLast} />;
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="aspect-square rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0 p-4">
            <MemberLoyaltyStamp filled={false} size={24} />
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
  entry: MemberPointTransaction;
  isLast: boolean;
}

export function ActivityHistoryEntry({
  entry,
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
        {points > 0 ? (
          <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <MemberLoyaltyStamp filled size={18} />
          </div>
        ) : (
          <div className="w-[36px] aspect-square rounded-full border flex items-center justify-center flex-shrink-0">
            <GiftIcon className="text-primary" size={18} />
          </div>
        )}
      </span>
      <div>
        <p className="text-sm text-primary dark:text-primary-lighter">
          {points > 0 ? (
            <span>
              Collected <span className="font-bold">{points}</span>{" "}
              {points === 1 ? "stamp" : "stamps"}
            </span>
          ) : (
            <span>
              Redeemed free reward for{" "}
              <span className="font-bold">{Math.abs(points)}</span> stamps
            </span>
          )}
        </p>
        <p className="text-xs text-foreground/50">
          {formatDateTime(entry.dateCreated)}
        </p>
      </div>
    </div>
  );
}
