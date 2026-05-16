import { MemberPointsHistory } from "@/types/domain";
import { MemberPointTransaction } from "@/types/domain";
import { LoyaltyStamp } from "./LoyaltyStamp";
import { formatDateTime } from "@/lib/utils/date.utils";

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
            <LoyaltyStamp filled={false} size={24} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-md text-primary dark:text-primary-lighter">No stamps yet</p>
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
  entry: MemberPointTransaction; // Rename to MEmbeRPointsTransaction
  isLast: boolean;
}

export function ActivityHistoryEntry({
  entry,
  isLast,
}: ActivityHistoryEntryProps) {
  const { points } = entry;
  const description = mapDescription(entry);

  return (
    <div
      className={`flex justify-between items-center py-2 ${
        !isLast ? "border-b border-foreground/10" : ""
      }`}
    >
      <div>
        <p className="text-sm text-primary dark:text-primary-lighter">{description}</p>
        <p className="text-xs text-foreground/50">
          {formatDateTime(entry.dateCreated)}
        </p>
      </div>

      {points > 0 && (
        <span className="inline-flex gap-1 items-centers text-primary/80">
          <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <LoyaltyStamp filled size={18} />
          </div>
        </span>
      )}
    </div>
  );
}

const mapDescription = (entry: MemberPointTransaction): string => {
  const { notes, points } = entry;
  const wholePoints = Math.trunc(points);

  switch (notes) {
    case "Accumulation":
      return `Collected ${wholePoints} ${wholePoints === 1 ? "stamp" : "stamps"}`;
    case "Redemption":
      return `Redeemed free reward (${wholePoints} stamps)`;
    default:
      return "TODO! Unknown transaction";
  }
};
