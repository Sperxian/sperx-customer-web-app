import { LoyaltyStamp } from "../shared/LoyaltyStamp";

interface HistoryEntry {
  label: string;
  date: string;
}

interface ActivityHistoryProps {
  entries: HistoryEntry[];
}

export function ActivityHistorySection({ entries }: ActivityHistoryProps) {
  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">
        Recent activity
      </p>

      {entries.map((entry, i) => {
        const isLast = (i === entries.length - 1);

        return (
          <div
            key={i}
            className={`flex justify-between items-center py-2 ${
              !isLast ? "border-b border-foreground/10" : ""
            }`}
          >
            <div>
              <p className="text-sm text-primary">
                {entry.label}
              </p>
              <p className="text-xs text-foreground/50">
                {entry.date}
              </p>
            </div>

            {/* Icon box */}
            <div className="w-[36px] aspect-square rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <LoyaltyStamp filled size={18} icon="coffee" />
            </div>
          </div>
        );
      })}
    </div>
  );
}