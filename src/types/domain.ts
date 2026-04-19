export interface MemberLoyalty {
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
};
