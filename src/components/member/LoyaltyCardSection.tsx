import { InfoIcon } from "lucide-react";
import { useState } from "react";

interface LoyaltyCardSectionProps {
  card: LoyaltyCardData;
}

export function LoyaltyCardSection({ card }: LoyaltyCardSectionProps) {
  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">
        Loyalty Card
      </p>
      <LoyaltyCard card={card}/>
    </div>
  );
}

interface LoyaltyCardData {
  loyaltyProgramName: string;
  memberId: string;
  totalStamps: number;
  collectedStamps: number;
  rewardDescription: string;
}

interface LoyaltyCardProps {
  card: LoyaltyCardData;
}

function LoyaltyCard({
  card,
}: LoyaltyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const hintMessage = (
    <p className="flex mt-2 text-center text-xs text-primary/80 items-center justify-center gap-[4px]">
      <InfoIcon size={11} />
      {isFlipped
        ? "Tap the card to see your stamps"
        : "Tap the card to show your QR code"}
    </p>
  );

  return (
    <div>
      <div
        className="flex h-64 max-h-[360px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="w-full h-full">
          {/* Scene */}
          <div
            onClick={()=>setIsFlipped(!isFlipped)}
            className="w-full h-full [perspective:900px] cursor-pointer"
          >
            {/* Inner — rotates on flip */}
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.4,0.2,0.2,1)] ${
                isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
              }`}
            >
              {/* Front face */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [--webkit-backface-visibility:hidden] overflow-hidden">
                <LoyaltyCardFront card={card} />
              </div>

              {/* Back face */}
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] [--webkit-backface-visibility:hidden]">
                <LoyaltyCardBack card={card} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {hintMessage}
      </div>
    </div>
  );
}


interface LoyaltyCardFrontProps {
  card: LoyaltyCardData;
}
export function LoyaltyCardFront({ card }: LoyaltyCardFrontProps) {
  const remaining = card.totalStamps - card.collectedStamps;
  const pct = (card.collectedStamps / card.totalStamps) * 100;

  return (
    <div className="h-full bg-primary rounded-3xl p-4 relative overflow-hidden flex flex-col">
      {/* Decorative circles */}
      <div className="absolute -top-[28px] -right-[28px] w-[90px] h-[90px] rounded-full border-[18px] border-white/5" />
      <div className="absolute bottom-[-18px] left-[18px] w-[55px] h-[55px] rounded-full border-[11px] border-white/5" />

      <div className="flex items-center justify-between uppercase tracking-widest mb-4">
        <p className="text-xs text-white/50 uppercase">
          {card.loyaltyProgramName}
        </p>
        <p className="text-xs text-secondary">
          {card.collectedStamps} / {card.totalStamps}
        </p>

      </div>

      <StampGrid
        total={card.totalStamps}
        collected={card.collectedStamps}
      />

      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex-1 h-1 bg-[#5C2D0A] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8943A] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm text-secondary font-bold whitespace-nowrap">
          {remaining > 0
            ? `${remaining} more for ${card.rewardDescription}`
            : `${card.rewardDescription} earned!`}
        </span>
      </div>
    </div>
  );
}

interface LoyaltyCardBackProps {
  card: LoyaltyCardData;
}

export function LoyaltyCardBack({ card }: LoyaltyCardBackProps) {
  return (
    <div className="h-full bg-primary rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center">

      {/* Decorative circle */}
      <div className="absolute -top-[28px] -left-[28px] w-[90px] h-[90px] rounded-full border-[18px] border-white/5" />

      <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
        {card.loyaltyProgramName}
      </p>

      <div className="bg-white rounded-lg p-4 mb-2">
        <QrCode size={108} />
      </div>

      <p className="text-xs text-white/50">
        {card.memberId}
      </p>
    </div>
  );
}

interface StampGridProps {
  total: number;
  collected: number;
}

export function StampGrid({ total, collected }: StampGridProps) {
  // 7 stamps, 1 row
  // 8 - 14 stamps, 2 rows
  // 15 - 28 stamps, 3/4 rows
  return (
    <div className={`grid grid-cols-5 gap-2 mb-[14px]`}>
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < collected;

        return (
          <div
            key={i}
            className={`aspect-square rounded-[9px] flex items-center justify-center relative ${
              filled
                ? "border-[1.5px] border-[#a76eff]/40 bg-[rgba(120,50,200,0.28)]"
                : "border-[1.5px] border-[#c8a0ff]/25 border-dashed bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <CoffeeCup filled={filled} size={32} />

            {!filled && (
              <span className="text-[8px] text-[#c8a0ff]/20 absolute bottom-[3px] right-[4px]">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface CoffeeCupProps {
  filled: boolean;
  size?: number;
}

export function CoffeeCup({ filled, size = 20 }: CoffeeCupProps) {
  const col = filled ? "#ffb800" : "rgba(200,160,255,0.28)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 7h9l-1.2 7H5.2L4 7Z" fill={col} />
      <path
        d="M13 9h1.5a1.5 1.5 0 0 1 0 3H13"
        stroke={col}
        strokeWidth="1.1"
      />
      <rect x="3" y="15" width="11" height="1.5" rx="0.75" fill={col} />
      <path
        d="M7 5.5 Q7.5 4.5 7 3.5M9.5 5.5 Q10 4.5 9.5 3.5"
        stroke={col}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface QrCodeProps {
  size?: number;
  color?: string;
  image?: boolean;
}

export function QrCode({ size = 108, color = "var(--primary)" }: QrCodeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-left finder */}
      <rect x="5" y="5" width="34" height="34" rx="3" stroke={color} strokeWidth="2.2" fill="none" />
      <rect x="12" y="12" width="20" height="20" rx="1.5" fill={color} />
      {/* Top-right finder */}
      <rect x="69" y="5" width="34" height="34" rx="3" stroke={color} strokeWidth="2.2" fill="none" />
      <rect x="76" y="12" width="20" height="20" rx="1.5" fill={color} />
      {/* Bottom-left finder */}
      <rect x="5" y="69" width="34" height="34" rx="3" stroke={color} strokeWidth="2.2" fill="none" />
      <rect x="12" y="76" width="20" height="20" rx="1.5" fill={color} />
      {/* Data modules */}
      {[54,63,72,81,90,99].map((x) => <rect key={`r0-${x}`} x={x} y="54" width="6" height="6" fill={color} />)}
      {[54,72,90].map((x) => <rect key={`r1-${x}`} x={x} y="63" width="6" height="6" fill={color} />)}
      {[54,63,81,99].map((x) => <rect key={`r2-${x}`} x={x} y="72" width="6" height="6" fill={color} />)}
      {[54,72,90].map((x) => <rect key={`r3-${x}`} x={x} y="81" width="6" height="6" fill={color} />)}
      {[54,63,81].map((x) => <rect key={`r4-${x}`} x={x} y="90" width="6" height="6" fill={color} />)}
      {[54,72,99].map((x) => <rect key={`r5-${x}`} x={x} y="99" width="6" height="6" fill={color} />)}
    </svg>
  )
}
