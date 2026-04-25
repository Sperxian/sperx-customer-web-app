"use client";

import { MemberLoyalty } from "@/types/domain";
import { createContext, ReactNode, useContext } from "react";

type MemberLoyaltyContextType = {
  value: MemberLoyalty | null;
};

const MemberLoyaltyContext = createContext<
  MemberLoyaltyContextType | undefined
>(undefined);

export const MemberLoyaltyContextProvider = ({
  value,
  children,
}: {
  value: MemberLoyalty;
  children: ReactNode;
}) => {
  return (
    <MemberLoyaltyContext.Provider value={{ value }}>
      {children}
    </MemberLoyaltyContext.Provider>
  );
};

export const useMemberLoyalty = (): MemberLoyalty => {
  const context = useContext(MemberLoyaltyContext);

  if (!context || !context.value) {
    throw new Error("useMember must be used within a MemberProvider");
  }

  return context.value;
};
