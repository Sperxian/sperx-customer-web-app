import { LoyaltyStamp } from "../../../../components/widgets/LoyaltyStamp";
import { useMemberLoyalty } from "../MemberContext";
import { StampBasedConfig } from "@/types/loyalty-program.types";
import { ActivityHistoryEntry } from "./ActivityHistoryEntry";
import type { Paginated } from "@/types/domain";

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
        history.items.map((entry, i) => (
          <ActivityHistoryEntry
            key={i}
            entry={entry}
          />
        ))
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
