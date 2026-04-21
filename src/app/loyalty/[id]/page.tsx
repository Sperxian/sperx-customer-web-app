"use client";

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

  const LOCAL_STORAGE_KEY = `spx-member-${programId}`;

  useEffect(() => {
    const existingMemberData = localStorage.getItem(LOCAL_STORAGE_KEY);

    const memberData: MemberData | null = existingMemberData
      ? (JSON.parse(existingMemberData) as MemberData)
      : null;

    if (memberData) {
      const memberPage = `/member/${memberData.memberId}`;
      console.debug(`Redirecting to ${memberPage}`);
      router.replace(memberPage);
    }

    if (!memberData) {
      // TODO: Stub member data
      const newMemberData = {
        memberId: "8599e97e-a2c2-4b67-80ca-47c484467669",
        dateCreated: new Date(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMemberData));
    }
  }, [LOCAL_STORAGE_KEY, router]);

  return (
    <div className="grid gap-8 p-4">
      {programId}
      <hr />
      {state}
      <hr />
    </div>
  );
}
