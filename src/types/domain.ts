import type { LoyaltyProgram } from "@/types/loyalty-program.types";

export type MemberLoyalty = {
  id: string;
  points: number;
  walletBalance: number | null;
  loyaltyProgram: LoyaltyProgram,
  shop: {
    id: string;
    name: string;
    config: ShopConfig;
  },
  isClaimed: boolean;
  dateCreated: Date,
};

export type ShopConfig = {
  iconLocation: string;
  theme?: ThemeColors;
}

export type ThemeColors = {
  primary?: string;
  primaryLightest?: string;
  primaryLighter?: string;
  primaryLight?: string;
  primaryDark?: string;
  primaryDarker?: string;
  primaryDarkest?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryLightest?: string;
  secondaryLighter?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  secondaryDarker?: string;
  secondaryDarkest?: string;
  secondaryForeground?: string;
};


export type Paginated = {
  page: number;
  size: number;
  total: number;
  items: MemberLoyaltyHistoryItem[];
}

export type MemberLoyaltyHistoryItem = {
  walletTransactionId: number | null;
  pointTransactionId: number | null;
  transactionDate: Date;
  type: 'ACCUMULATION' | 'WALLET_TOP_UP' | 'WALLET_SPEND' | 'REDEMPTION'
  points: number | null;
  balance: number | null;
  reward: {
    redemptionId: string;
    name: string;
  } | null;
  notes?: string;
}