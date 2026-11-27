import { WalletIcon } from "lucide-react";
import { LoyaltyStamp } from "../../../../components/widgets/LoyaltyStamp";
import { useMemberLoyalty } from "../MemberContext";
import { ActivityHistoryEntry } from "./ActivityHistoryEntry";
import type { Paginated } from "@/types/domain";
import type { LoyaltyProgramType } from "@/types/loyalty-program.types";

interface ActivityHistoryProps {
  history: Paginated;
}

export function ActivityHistorySection({ history }: ActivityHistoryProps) {
  const {
    memberLoyalty: { loyaltyProgram },
  } = useMemberLoyalty();
  const stampIcon =
    "stampIcon" in loyaltyProgram.config
      ? loyaltyProgram.config.stampIcon
      : "star";

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
        <EmptyActivityState
          programType={loyaltyProgram.type}
          stampIcon={stampIcon}
        />
      )}
    </div>
  );
}

interface EmptyActivityStateProps {
  programType: LoyaltyProgramType;
  stampIcon: string;
}

function EmptyActivityState({
  programType,
  stampIcon,
}: EmptyActivityStateProps) {
  const isWalletProgram = programType === "WALLET_BASED";

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="aspect-square rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0 p-4">
        {isWalletProgram ? (
          <WalletIcon size={24} className="text-primary" aria-hidden="true" />
        ) : (
          <LoyaltyStamp icon={stampIcon} filled={false} size={24} />
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-md text-primary dark:text-primary-lighter">
          {isWalletProgram ? "No wallet activity yet" : "No stamps yet"}
        </p>
        <p className="text-xs text-foreground/60">
          {isWalletProgram
            ? "Your activity will appear here after your first top-up."
            : "Your activity will appear here after your first stamp."}
        </p>
      </div>
    </div>
  );
}
