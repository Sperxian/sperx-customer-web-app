import "@/app/globals.css";
import { AppHeader } from "@/app/(main)/member/[id]/components/AppHeader";
import { getMemberLoyalty } from "@/lib/api/member";
import { MemberLoyaltyContextProvider } from "./MemberContext";

export default async function MemberLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const {id: memberId} = await params;
  const memberLoyalty = await getMemberLoyalty(memberId);
  if(!memberLoyalty) {
    // TODO: Redirect to not found
    throw new Error('Member not found!');
  }

  return (
    <MemberLoyaltyContextProvider value={memberLoyalty}>
      <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl bg-white shadow flex flex-col overflow-hidden">
        <AppHeader />

        <div className="flex-1 relative overflow-hidden">
          <main className="h-full overflow-y-auto pb-10">{children}</main>

          {/* bottom fade indicator */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white via-white/75 via-white/30 to-transparent" />
        </div>
      </div>
    </MemberLoyaltyContextProvider>
  );
}
