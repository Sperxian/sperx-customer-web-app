import { ChevronRightIcon } from "lucide-react";
import { LoyaltyStamp } from "./member/[id]/components/LoyaltyStamp";
import { themeCssVars } from "@/lib/theme";
import "@/app/globals.css";

type LoyaltyOverviewCardProps = {
  id: string;
  shopName: string;
  icon: string;
  progressPercent: number;
  currentPoints: number;
  goalPoints: number;
  remainingPoints: number;
  styles?: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    secondary: string;
    secondaryDarkest: string;

    primaryDark: string;
    primaryDarker: string;
    secondaryDark: string;
    primaryDarkest: string;
    secondaryLight: string;
    primaryLightest: string;
    secondaryDarker: string;
    secondaryLighter: string;
    primaryForeground: string;
    secondaryLightest: string;
    secondaryForeground: string;
  };
};

export default function IndexPage() {
  const loyaltyCards: LoyaltyOverviewCardProps[] = [
    {
      id: "id-2",
      shopName: "Cloud Scoop",
      icon: "ice_cream2",
      progressPercent: 37.5,
      currentPoints: 3,
      goalPoints: 8,
      remainingPoints: 5,
      styles: {
        primary: "#be123c",
        primaryLight: "#e11d48",
        primaryLighter: "#fb7185",

        secondary: "#3c0bc4",
        secondaryDarkest: "#05070d",

        primaryDark: "#9f1239",
        primaryDarker: "#7f0c29",
        secondaryDark: "#0b1220",
        primaryDarkest: "#4a0418",
        secondaryLight: "#475569",
        primaryLightest: "#ffe4e6",
        secondaryDarker: "#080d18",
        secondaryLighter: "#94a3b8",
        primaryForeground: "#ffffff",
        secondaryLightest: "#cbd5e1",
        secondaryForeground: "#ffffff",
      },
    },
    {
      id: "s",
      shopName: "Café Barakoo",
      icon: "coffee",
      progressPercent: 80,
      currentPoints: 8,
      goalPoints: 10,
      remainingPoints: 2,
    },
  ];

  return (
    <div className="flex flex-col p-4 pt-8 gap-4">
      {/* Div Clss Header */}
      <div>
        <button className="bg-primary text-white rounded-2xl px-4 py-1 capitalize">
          Sign in
        </button>
      </div>

      {/* List of Loyalty Cards */}
      <div className="flex flex-col">
        <p className="text-sm mb-2 text-foreground/50">Loyalty Cards</p>

        <div className="flex flex-col gap-2">
          {loyaltyCards.map((card) => (
            <LoyaltyOverviewCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoyaltyOverviewCard(card: LoyaltyOverviewCardProps) {
  const styles = card.styles ? themeCssVars(card.styles) : {};

  return (
    <div style={styles}>
      <div className="h-full bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="aspect-square rounded-xl min-h-12 flex items-center justify-center relative border-1 border-primary-lighter bg-primary-light">
            <LoyaltyStamp icon={card.icon} filled size={32} />
          </div>
          <p className="tracking-widest text-secondary text-xl">
            {card.shopName}
          </p>
        </div>

        <div className="bg-secondary-darkest rounded-full overflow-hidden">
          <div
            className="h-1 bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${card.progressPercent}%` }}
          />
        </div>

        <div className="h-8 overflow-hidden">
          <div
            className={[
              "flex justify-between absolute bottom-0 left-0 right-0 p-4",
              "bg-gradient-to-r from-primary via-primary-dark/75 via-primary-darker/30 to-primary-darkest",
            ].join(" ")}
          >
            <p className="text-sm text-white">
              {card.remainingPoints} points more for next reward
            </p>
            <ChevronRightIcon color="white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
