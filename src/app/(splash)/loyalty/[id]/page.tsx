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

type PAGE_STATE = "UNMOUNTED" | "CHECKING" | "CREATING" | "REDIRECTING";

const PAGE_STATE_METADATA = {
  CHECKING: {
    title: "Checking your membership",
    subtitle: "This only takes a few moments...",
  },
  CREATING: {
    title: "Joining the program",
    subtitle: "Creating your membership...",
  },
  REDIRECTING: {
    title: "Redirecting to your page",
    subtitle: "Sending you to your member page...",
  },
  UNMOUNTED: {
    title: "",
    subtitle: "",
  },
};

export default function MemberPage({ params }: PageParams) {
  const router = useRouter();

  const [state, setState] = useState<PAGE_STATE>("UNMOUNTED");
  const { id: programId } = use(params);

  const currentStateMetadata = PAGE_STATE_METADATA[state];

  useEffect(() => {
    console.log("Initializing...");
  }, []);

  useEffect(() => {
    const LOCAL_STORAGE_KEY = `spx-loyalty-${programId}`;

    const checkLocalMember = () => {
      setState("CHECKING");
      const existingMemberData = localStorage.getItem(LOCAL_STORAGE_KEY);

      const memberData: MemberData | null = existingMemberData
        ? (JSON.parse(existingMemberData) as MemberData)
        : null;

      const timeoutMs = 1000;
      if (memberData) {
        setTimeout(() => redirectToMemberPage(memberData.memberId));
      } else {
        setTimeout(createMember, timeoutMs);
      }
    };
    
    const createMember = async () => {
      setState("CREATING");
      const { id: memberId, dateCreated: dateJoined } =
        await createMemberLoyalty(programId);
      console.debug(`Created new member ID: ${memberId}`);

      const newMemberData = {
        memberId,
        dateCreated: dateJoined,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMemberData));

      setTimeout(() => redirectToMemberPage(memberId), 500);
    };

    const redirectToMemberPage = (memberId: string) => {
      setState("REDIRECTING");
      const memberPage = `/member/${memberId}`;
      router.replace(memberPage);
    };

    setTimeout(checkLocalMember, 0);
  }, [programId, router]);

  return (
    <div className="flex flex-col items-center py-8 m-auto w-[75%] gap-8 mt-[64px]">
      {/* Decorative circles */}
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />

      <Image
        className="dark:invert bg-white aspect-square object-cover animate-pulse"
        src={"/sperx-logo.png"}
        alt="Sperx"
        width={120}
        height={120}
        priority
      />
      {/* {state} */}

      <div className="flex flex-col items-center gap-0 w-[75%]">
        <h1 className="text-3xl">Welcome</h1>
        {/* <p className="text-sm text-center text-foreground/50">
          We&apos;re checking your membership within this merchant
        </p> */}
      </div>

      <div
        className={`w-full flex items-center justify-start gap-4 rounded-xl bg-primary p-4 mt-8
        ${state !== "UNMOUNTED" ? "animate-in fade-in slide-in-from-top-4" : "opacity-0 -translate-y-4"}
        duration-500`}
      >
        <LoaderCircleIcon
          size={32}
          className="animate-spin aspect-square text-secondary/80 rounded-xl"
        />
        <div className="flex flex-col justify-start gap-0">
          <p className="text-md text-bold text-white">
            {currentStateMetadata.title}
          </p>
          <p className="text-xs text-white/50">
            {currentStateMetadata.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
