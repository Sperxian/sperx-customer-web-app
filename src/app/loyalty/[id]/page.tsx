"use client";

import { createMemberLoyalty } from "@/lib/api/member";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

type MemberData = {
  memberId: string;
  dateCreated: Date;
};

export default function MemberPage({ params }: PageParams) {
  const router = useRouter();

  const [state, _setState] = useState<"INITIAL">("INITIAL");
  const { id: programId } = use(params);

  const LOCAL_STORAGE_KEY = `spx-loyalty-${programId}`;

  useEffect(() => {
    async function joinLoyaltyProgram() {
      const existingMemberData = localStorage.getItem(LOCAL_STORAGE_KEY);

      const memberData: MemberData | null = existingMemberData
        ? (JSON.parse(existingMemberData) as MemberData)
        : null;

      if (memberData) {
        const memberPage = `/member/${memberData.memberId}`;
        console.debug(`Redirecting to ${memberPage}`);
        // router.replace(memberPage);
        return;
      }

      const { id: memberId, dateCreated: dateJoined } =
        await createMemberLoyalty(programId);
      console.debug(`Created new member ID: ${memberId}`);

      const memberPage = `/member/${memberId}`;
      console.debug(`Redirecting to ${memberPage}`);
      // router.replace(memberPage);

      const newMemberData = {
        memberId,
        dateCreated: dateJoined,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMemberData));
    }

    joinLoyaltyProgram();
  }, [LOCAL_STORAGE_KEY, router, programId]);

  return (
    <div className="flex flex-col items-center py-8 m-auto w-[75%] gap-8">
      {/* Decorative circles */}
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />

      <Image
        className="dark:invert bg-white aspect-square object-cover animate-pulse"
        src={"/sperx-logo-zoomed.png"}
        alt="Sperx"
        width={120}
        height={120}
        priority
      />

      <div className="flex flex-col items-center gap-0 w-[75%]">
        <h1 className="text-3xl">Just a second!</h1>
        <p className="text-sm text-center text-foreground/50">
          We&apos;re checking your membership within this merchant
        </p>
      </div>

      <div className="w-full flex items-center justify-start gap-4 rounded-xl bg-primary p-4">
        <LoaderCircleIcon
          size={32}
          className="animate-spin aspect-square text-secondary/80 rounded-xl"
        />
        <div className="flex flex-col justify-start gap-0">
          <p className="text-md text-bold text-white">
            Checking your membership
          </p>
          <p className="text-xs text-white/50">
            This only takes a few moments...
          </p>
        </div>
      </div>
    </div>
  );
}
