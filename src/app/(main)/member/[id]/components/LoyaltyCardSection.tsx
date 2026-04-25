"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { LoyaltyStamp } from "./LoyaltyStamp";
import { QRCodeSVG } from "qrcode.react";
import { useMemberLoyalty } from "@/app/(main)/member/[id]/MemberContext";

export function LoyaltyCardSection() {
  const memberLoyalty = useMemberLoyalty();
  const card = {
    memberId: memberLoyalty.id,
    loyaltyProgramName: memberLoyalty.loyaltyProgram.name,
    totalStamps: memberLoyalty.loyaltyProgram.config.goalPoints,
    collectedStamps: memberLoyalty.points,
    rewardDescription: memberLoyalty.loyaltyProgram.config.reward,
  };

  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">Loyalty Card</p>
      <LoyaltyCard card={card} />
    </div>
  );
}

export interface LoyaltyCardData {
  loyaltyProgramName: string;
  memberId: string;
  totalStamps: number;
  collectedStamps: number;
  rewardDescription: string;
}

interface LoyaltyCardProps {
  card: LoyaltyCardData;
}

function LoyaltyCard({ card }: LoyaltyCardProps) {
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
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full [perspective:900px] cursor-pointer"
          >
            {/* Inner — rotates on flip */}
            <div
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.4,0.2,0.2,1)] ${
                isFlipped
                  ? "[transform:rotateY(180deg)]"
                  : "[transform:rotateY(0deg)]"
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

      <div>{hintMessage}</div>
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
          {Math.trunc(card.collectedStamps)} / {card.totalStamps}
        </p>
      </div>

      <StampGrid total={card.totalStamps} collected={card.collectedStamps} />

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
        <QrCode data={card.memberId} size={140} color="var(--primary)" />
      </div>

      <p className="text-xs text-white/50">{card.memberId}</p>
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
            <LoyaltyStamp filled={filled} size={32} icon="coffee" />

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

interface QrCodeProps {
  data: string;
  size?: number;
  color?: string;
  bgColor?: string;
  errorLevel?: "L" | "M" | "Q" | "H";
}

export function QrCode({
  data,
  size = 120,
  color = "var(--secondary)",
  bgColor = "white",
  errorLevel = "H",
}: QrCodeProps) {
  return (
    <QRCodeSVG
      value={data}
      size={size}
      bgColor={bgColor}
      fgColor={color}
      level={errorLevel}
    />
  );
}
