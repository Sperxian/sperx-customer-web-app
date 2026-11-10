import type { LoyaltyProgram } from "@/types/loyalty-program.types";

export type MemberLoyalty = {
  id: string;
  points: number;
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


export type MemberPointsHistory = {
  page: number;
  size: number;
  total: number;
  items: MemberPointTransaction[];
}

export type MemberPointTransaction = {
  id: string;
  memberId: string;
  points: number;
  notes?: string;
  dateCreated: Date;
};
