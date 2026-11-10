import { MemberLoyaltyStamp } from "@/app/components/widgets/LoyaltyStamp";

export interface LoyaltyCardData {
  loyaltyProgramName: string;
  memberId: string;
  totalStamps: number;
  collectedStamps: number;
  rewardDescription: string;
}

interface StampLoyaltyCardProps {
  card: LoyaltyCardData;
}

export function StampLoyaltyCard({ card }: StampLoyaltyCardProps) {
  const trackingPoints = card.collectedStamps % card.totalStamps;
  const remainingPoints = card.totalStamps - trackingPoints;
  const remainingPercent = (card.collectedStamps / card.totalStamps) * 100;

  return (
    <div className="h-full bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute -top-[28px] -right-[28px] w-[90px] h-[90px] rounded-full border-[18px] border-white/5" />
      <div className="absolute bottom-[-18px] left-[18px] w-[55px] h-[55px] rounded-full border-[11px] border-white/5" />

      <div>
        <div className="flex items-center justify-between uppercase tracking-widest mb-4">
          <p className="text-xs text-white uppercase">
            {card.loyaltyProgramName}
          </p>
          <p className="text-xs text-secondary">
            {trackingPoints} / {card.totalStamps}
          </p>
        </div>

        <StampGrid total={card.totalStamps} collected={trackingPoints} />
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex-1 h-1 bg-secondary-darkest rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${remainingPercent}%` }}
          />
        </div>
        <span className="text-sm text-secondary font-bold whitespace-nowrap">
          {remainingPoints > 0
            ? `${remainingPoints} more for ${card.rewardDescription}`
            : `${card.rewardDescription} earned!`}
        </span>
      </div>
    </div>
  );
}

interface StampGridProps {
  total: number;
  collected: number;
}

function StampGrid({ total, collected }: StampGridProps) {
  const MAX_ITEMS_PER_ROW = 5;
  const rows = Math.ceil(total / MAX_ITEMS_PER_ROW);
  const columns = Math.ceil(total / rows);

  const maxHeight = rows === 1 ? "96px" : rows === 2 ? "72px" : "48px";

  return (
    <div
      className="grid gap-2 justify-center"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(12px, ${maxHeight}))`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < collected;

        return (
          <div
            key={i}
            className={`aspect-square rounded-xl min-h-12x flex items-center justify-center relative ${
              filled
                ? "border-2 border-primary-lighter bg-primary-light"
                : "border-2 border-primary-lighter border-dashed bg-primary-darker/20"
            }`}
          >
            <MemberLoyaltyStamp filled={filled} size={32} />

            {!filled && (
              <span className="text-[8px] text-white absolute bottom-1 right-1">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
