export function HowItWorksSection() {
  const shopName = "Cafe Barako";
  const goalStamps = 10;
  const reward = "Free Coffee";

  const steps = [
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
      title: `Collect ${goalStamps} stamps`,
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

      <div className="flex flex-col items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center justify-start gap-4">
              <div className="flex flex-shrink-0 items-center justify-center w-[32px] aspect-square rounded-full bg-primary text-secondary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-sm text-primary">{step.title}</p>
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
