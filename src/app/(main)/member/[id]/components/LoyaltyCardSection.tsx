"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useMemberLoyalty } from "@/app/(main)/member/[id]/MemberContext";
import { StampLoyaltyCard } from "@/app/components/widgets/StampLoyaltyCard";
import type { LoyaltyCardData } from "@/app/components/widgets/StampLoyaltyCard";

export function LoyaltyCardSection() {
  const { memberLoyalty } = useMemberLoyalty();
  const [reward] = memberLoyalty.loyaltyProgram.config.availableRewards;

  const card = {
    memberId: memberLoyalty.id,
    loyaltyProgramName: memberLoyalty.loyaltyProgram.name,
    totalStamps: reward.goalPoints,
    collectedStamps: memberLoyalty.points,
    rewardDescription: reward.name ?? "reward",
  };

  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">Loyalty Card</p>
      <LoyaltyCard card={card} />
    </div>
  );
}

interface LoyaltyCardProps {
  card: LoyaltyCardData;
}

function LoyaltyCard({ card }: LoyaltyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const hintMessage = (
    <p className="flex mt-2 text-center text-xs text-primary-lighter items-center justify-center gap-1">
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
                <StampLoyaltyCard card={card} />
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

interface LoyaltyCardBackProps {
  card: LoyaltyCardData;
}

export function LoyaltyCardBack({ card }: LoyaltyCardBackProps) {
  return (
    <div className="h-full bg-primary rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative circle */}
      <div className="absolute -top-[28px] -left-[28px] w-[90px] h-[90px] rounded-full border-[18px] border-white/5" />

      <p className="text-xs text-white uppercase tracking-widest mb-4">
        {card.loyaltyProgramName}
      </p>

      <div className="bg-white rounded-lg p-4 mb-2">
        <QrCode data={card.memberId} size={140} color="var(--primary)" />
      </div>

      <p className="text-xs text-white">{card.memberId}</p>
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
