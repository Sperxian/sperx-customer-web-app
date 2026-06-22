"use client";

import { getMemberLoyalty } from "@/lib/api/member";
import { MemberLoyalty } from "@/types/domain";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type MemberLoyaltyContextType = {
  memberLoyalty: MemberLoyalty;
  refresh: () => Promise<void>;
};

const MemberLoyaltyContext = createContext<
  MemberLoyaltyContextType | undefined
>(undefined);

export const MemberLoyaltyContextProvider = ({
  value: initialValue,
  children,
}: {
  value: MemberLoyalty;
  children: ReactNode;
}) => {
  const [memberLoyalty, setMemberLoyalty] = useState<MemberLoyalty>(initialValue);

  const refresh = useCallback(async () => {
    if (!memberLoyalty?.id) return;

    const data = await getMemberLoyalty(memberLoyalty.id);
    if (data) {
      setMemberLoyalty(data);
    }
  }, [memberLoyalty]);

  return (
    <MemberLoyaltyContext.Provider value={{ memberLoyalty: memberLoyalty, refresh }}>
      {children}
    </MemberLoyaltyContext.Provider>
  );
};

export const useMemberLoyalty = () => {
  const context = useContext(MemberLoyaltyContext);

  if (!context) {
    throw new Error(
      "useMemberLoyalty must be used within a MemberLoyaltyContextProvider",
    );
  }

  return context;
};
