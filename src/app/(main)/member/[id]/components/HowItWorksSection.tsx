"use client";
import { WalletBasedConfig } from "@/types/loyalty-program.types";
import { useMemberLoyalty } from "../MemberContext";

export function HowItWorksSection() {
  const { memberLoyalty } = useMemberLoyalty();
  const { shop, loyaltyProgram } = memberLoyalty;
  const shopName = shop.name;
  const { goalPoints, name: reward } =
    loyaltyProgram.config.availableRewards[0];

  const steps =
    loyaltyProgram.type === "WALLET_BASED"
      ? [
          {
            title: `Visit ${shopName}`,
            subtitle: "Ask the staff to top up your wallet balance.",
          },
          {
            title: "Pay, then show your QR code",
            subtitle:
              "After you pay, show your personal QR code so the staff can scan it and add the balance to your wallet.",
          },
          {
            title: "Spend your wallet balance",
            subtitle:
              "Use your balance on future purchases. Every " +
              `₱${((loyaltyProgram.config as WalletBasedConfig).convertibleAmountCents / 100).toFixed(2)} spent ` +
              `earns ${(loyaltyProgram.config as WalletBasedConfig).pointsAwarded} points.`,
          },
          {
            title: `Claim your ${reward}`,
            subtitle: `Once you reach ${goalPoints} points, claim your reward at the shop.`,
          },
        ]
      : [
          {
            title: `Visit ${shopName}`,
            subtitle:
              "Visit the shop and ask the staff what purchase qualifies for a stamp.",
          },
          {
            title: "Show your QR code",
            subtitle:
              "Tap the card above to flip it, then let the staff scan your personal QR code at the counter.",
          },
          {
            title: `Collect ${goalPoints} stamps`,
            subtitle:
              "Each scan adds one stamp to your card. Watch them fill up visit by visit.",
          },
          {
            title: `Claim your ${reward}`,
            subtitle:
              "Once your card is full, show it at the counter to redeem your reward — on us.",
          },
        ];
  return (
    <div>
      <p className="text-sm capitalize mb-2 text-foreground/50">How It Works</p>

      <div className="flex flex-col items-start justify-center gap-2">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center justify-start gap-4">
              <div className="flex flex-shrink-0 items-center justify-center w-[32px] aspect-square rounded-full bg-primary text-secondary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-sm text-primary dark:text-primary-lighter">
                  {step.title}
                </p>
                <p className="text-xs text-foreground/60">{step.subtitle}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 bord2er-b border-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
