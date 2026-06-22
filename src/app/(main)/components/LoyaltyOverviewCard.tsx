"use client";

import { themeCssVars } from "@/lib/theme";
import { MemberLoyalty } from "@/types/domain";
import { ChevronRightIcon } from "lucide-react";
import { LoyaltyStamp } from "../member/[id]/components/LoyaltyStamp";
import { useRouter } from "next/navigation";

export default function LoyaltyOverviewCard(memberLoyalty: MemberLoyalty) {
  const router = useRouter();

  const {
    id: memberId,
    loyaltyProgram: {
      config: {
        stampIcon,
        availableRewards: [{ goalPoints }],
      },
    },
    shop: {
      name: shopName,
      config: { theme },
    },
    points,
    isClaimed,
  } = memberLoyalty;

  const styles = theme ? themeCssVars(theme) : {};
  const remainingPoints = goalPoints % points;
  const progressPercent = (points / goalPoints) * 10;
  console.log({ isClaimed });

  const goToMemberPage = () => {
    router.push(`/member/${memberId}`);
  };

  return (
    <div style={styles}>
      <div className="h-full bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="aspect-square rounded-xl min-h-12 flex items-center justify-center relative border-1 border-primary-lighter bg-primary-light">
              <LoyaltyStamp icon={stampIcon} filled size={32} />
            </div>
            <p className="tracking-widest text-secondary text-xl">{shopName}</p>
          </div>
          {!isClaimed && (
            <div className="bg-secondary text-white text-sm rounded-2xl px-4 py-1 capitalize">
              Guest
            </div>
          )}
        </div>

        <div className="bg-secondary-darkest rounded-full overflow-hidden">
          <div
            className="h-1 bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="h-8 overflow-hidden">
          <div
            className={[
              "flex justify-between absolute bottom-0 left-0 right-0 p-4",
              "bg-gradient-to-r from-primary via-primary-dark/75 via-primary-darker/30 to-primary-darkest",
            ].join(" ")}
            onClick={goToMemberPage}
          >
            <p className="text-sm text-white">
              {remainingPoints} points more for next reward
            </p>
            <ChevronRightIcon color="white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
