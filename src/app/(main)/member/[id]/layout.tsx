import "@/app/globals.css";
import { AppHeader } from "@/app/(main)/member/[id]/components/AppHeader";
import { getMemberLoyalty } from "@/lib/api/member";
import { MemberLoyaltyContextProvider } from "./MemberContext";
import ClerkProviderWrapper from "../ClerkProviderWrapper";
import { notFound } from "next/navigation";

export default async function MemberLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id: memberId } = await params;
  const memberLoyalty = await getMemberLoyalty(memberId);
  if (!memberLoyalty) {
    return notFound();
  }

  return (
    <ClerkProviderWrapper>
      <MemberLoyaltyContextProvider value={memberLoyalty}>
        <AppHeader/>
        {children}
      </MemberLoyaltyContextProvider>
    </ClerkProviderWrapper>
  );
}
