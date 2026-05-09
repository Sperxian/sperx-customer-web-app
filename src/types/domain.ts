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
