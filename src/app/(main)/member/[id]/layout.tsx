import { AppHeader } from "@/app/(main)/member/[id]/components/AppHeader";
import { getMemberLoyalty } from "@/lib/api/member";
import { MemberLoyaltyContextProvider } from "./MemberContext";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import ForbiddenContent from "@/app/(main)/member/[id]/components/ForbiddenContent";
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
  let memberLoyalty = null;
  try {
    memberLoyalty = await getMemberLoyalty(memberId);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      return <ForbiddenContent />;
    }
  }

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
