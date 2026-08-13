"use client";

import SplashPageTemplate from "./SplashPageTemplate";
import { HomeIcon, ShieldQuestionIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function NotFoundContent() {
  const router = useRouter();
  const goHome = () => {
    router.replace("/");
  };

  return (
    <SplashPageTemplate
      defaultSlot={
        <div className="flex flex-col items-center w-[75%] gap-4">
          <div className="flex flex-col items-center w-full gap-2">
            <span className="text-2xl font-bold text-primary dark:text-primary-lighter capitalize text-center">
              You’ve reached an unstamped territory.
            </span>
            <span className="text-sm font-medium text-foreground/90 text-center">
              This page expired before earning its free coffee — or{" "}
              <span className="font-bold text-primary-lighter">
                never existed
              </span>{" "}
              in the first place.
            </span>
          </div>
          <ShieldQuestionIcon className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] text-primary dark:text-primary-lighter" />
        </div>
      }
      actionSlot={
        <button
          className="bg-primary hover:bg-primary/80 text-white p-4 rounded-lg w-full inline-flex items-center justify-center gap-2"
          onClick={goHome}
        >
          <HomeIcon size={18} />
          Go Home
        </button>
      }
    />
  );
}
