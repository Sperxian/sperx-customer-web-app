"use client";

import { HomeIcon, LogInIcon, ShieldAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SplashPageTemplate from "@/app/(splash)/SplashPageTemplate";
import { SignInButton, useUser } from "@clerk/nextjs";
import "@/app/globals.css";

export default function ForbiddenContent() {
  const router = useRouter();
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();

  const goHome = () => {
    router.replace("/");
  };

  return (
    <SplashPageTemplate
      defaultSlot={
        <div className="flex flex-col items-center w-[75%] gap-4">
          <div className="flex flex-col items-center w-full gap-2">
            <span className="text-2xl font-bold text-primary dark:text-primary-lighter capitalize text-center">
              You {"don't"} have permission to view this member loyalty.
            </span>
            {isUserLoaded && !isSignedIn && (
              <span className="text-sm font-medium text-foreground/90 text-center">
                If this belongs to you,you might want to{" "}
                <span className="font-bold text-primary-lighter">sign in</span>.
              </span>
            )}

            {isUserLoaded && isSignedIn && (
              <span className="text-sm font-medium text-foreground/90 text-center">
                This member loyalty belongs to another account.
              </span>
            )}
          </div>
          <ShieldAlertIcon className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] text-primary dark:text-primary-lighter" />
        </div>
      }
      actionSlot={
        isUserLoaded ? (
          <div className="flex flex-col gap-2 w-full">
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="bg-primary hover:bg-primary/80 text-white p-4 rounded-lg w-full inline-flex items-center justify-center gap-2">
                  <LogInIcon size={18} />
                  Sign In
                </button>
              </SignInButton>
            )}
            <button
              className={[
                "p-4 rounded-lg w-full inline-flex items-center justify-center gap-2",
                isSignedIn
                  ? "bg-primary hover:bg-primary/80 text-white"
                  : "bg-background hover:bg-background/80 text-foreground",
                "border border-primary dark:border-primary-lighter",
              ].join(" ")}
              onClick={goHome}
            >
              <HomeIcon size={18} />
              Go Home
            </button>
          </div>
        ) : null
      }
    />
  );
}
