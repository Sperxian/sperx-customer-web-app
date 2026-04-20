import { MemberPointsHistory } from "@/types/domain";
import { MemberPointsTracking } from "@/types/domain";
import { LoyaltyStamp } from "../shared/LoyaltyStamp";
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

      {history.items.map((entry, i) => {
        const isLast = (i === history.items.length - 1);

        return (<ActivityHistoryEntry key={i} entry={entry} isLast={isLast} />);
      })}
    </div>
  );
}

interface ActivityHistoryEntryProps {
  entry: MemberPointsTracking;
  isLast: boolean;
}

export function ActivityHistoryEntry({ entry, isLast }: ActivityHistoryEntryProps) {
  return (
    <div
      className={`flex justify-between items-center py-2 ${
        !isLast ? "border-b border-foreground/10" : ""
      }`}
    >
      <div>
        <p className="text-sm text-primary">
          Collected 1 stamp
        </p>
        <p className="text-xs text-foreground/50">
          {formatDateTime(entry.dateCreated)}
        </p>
      </div>

      <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <LoyaltyStamp filled size={18} icon="coffee" />
      </div>
    </div>
  );
}