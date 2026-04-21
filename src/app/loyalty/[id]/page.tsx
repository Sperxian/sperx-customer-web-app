"use client";

import { createMemberLoyalty } from "@/lib/api/member";
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
        router.replace(memberPage);
        return;
      }

      const { id: memberId, dateCreated: dateJoined } =
        await createMemberLoyalty(programId);
      console.debug(`Created new member ID: ${memberId}`);

      const memberPage = `/member/${memberId}`;
      console.debug(`Redirecting to ${memberPage}`);
      router.replace(memberPage);

      const newMemberData = {
        memberId,
        dateCreated: dateJoined,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMemberData));
    }

    joinLoyaltyProgram();
  }, [LOCAL_STORAGE_KEY, router, programId]);

  return (
    <div className="grid gap-8 p-4">
      {programId}
      <hr />
      {state}
      <hr />
    </div>
  );
}
