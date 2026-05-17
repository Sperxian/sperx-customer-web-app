export type MemberLoyalty = {
  id: string;
  points: number;
  loyaltyProgram: {
    id: string;
    name: string;
    type: string;
    config: StampBasedConfig;
  },
  shop: {
    id: string;
    name: string;
    config: ShopConfig;
  },
  dateCreated: Date,
};

export type ShopConfig = {
  iconLocation: string;
  theme?: ThemeColors;
}

export type StampBasedConfig = {
  stampIcon: string;
  availableRewards: RewardMetadata[];
};

export type RewardMetadata = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
};

export type ThemeColors = {
  background?: string;
  foreground?: string;
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
