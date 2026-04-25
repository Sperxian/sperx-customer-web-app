export type MemberLoyalty = {
  id: string;
  points: number;
  loyaltyProgram: {
    id: string;
    name: string;
    type: string;
    config: {
      goalPoints: number;
      reward: string
    }
  },
  shop: {
    id: string;
    name: string;
    config: Record<string, unknown>;
  },
  dateCreated: Date,
};

export type MemberPointsHistory = {
  page: number;
  size: number;
  total: number;
  items: MemberPointsTracking[];
}

export type MemberPointsTracking = {
  id: string;
  memberId: string;
  points: number;
  notes?: string;
  dateCreated: Date;
};
