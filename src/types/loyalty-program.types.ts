export type LoyaltyProgram = {
  id: string;
  name: string;
  type: string;
  config: StampBasedConfig;
};

export type StampBasedConfig = {
  stampIcon: string;
  availableRewards: RewardMetadata[];
};

export type WalletBasedConfig = {
  convertibleAmountCents: number;
  pointsAwarded: number;
  availableRewards: RewardMetadata[];
};

export type RewardMetadata = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
};