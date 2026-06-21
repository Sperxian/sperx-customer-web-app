import { AppHeader } from "@/app/(main)/member/[id]/components/AppHeader";
import { getMemberLoyalty } from "@/lib/api/member";
import { MemberLoyaltyContextProvider } from "./MemberContext";
import { notFound } from "next/navigation";
import "@/app/globals.css";

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
    <MemberLoyaltyContextProvider value={memberLoyalty}>
      <AppHeader />
      {children}
    </MemberLoyaltyContextProvider>
  );
}
