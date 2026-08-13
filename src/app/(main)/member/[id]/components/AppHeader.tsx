"use client";
import { useMemberLoyalty } from "@/app/(main)/member/[id]/MemberContext";
import { themeCssVars } from "@/lib/theme";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export function AppHeader() {
  const isCustomerLoginEnabled =
    process.env.NEXT_PUBLIC_FEATURE_FLAG_ENABLE_CUSTOMER_LOGIN === "true";

  const { memberLoyalty } = useMemberLoyalty();
  const {
    shop: {
      name: shopName,
      config: { iconLocation, theme },
    },
    loyaltyProgram: { name: loyaltyProgramName },
  } = memberLoyalty;
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();

  const themeVars = theme ? themeCssVars(theme) : undefined;

  return (
    <header
      className="flex items-center justify-between gap-3 bg-primary px-4 py-3 flex-shrink-0"
      style={themeVars}
    >
      <div className="flex items-center gap-3 flex-shrink-0">
        <Image
          className="aspect-square bg-white rounded-full object-scale-down"
          src={iconLocation}
          alt={shopName}
          width={36}
          height={36}
          priority
        />
        <div>
          <h1 className="text-white text-xl font-medium leading-tight">
            {shopName}
          </h1>

          <p className="text-white/50 text-xs leading-tight">
            {loyaltyProgramName}
          </p>
        </div>
      </div>

      {isCustomerLoginEnabled &&
        isUserLoaded &&
        (isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button className="bg-secondary text-white rounded-2xl px-4 py-1 capitalize">
              Sign in
            </button>
          </SignInButton>
        ))}
    </header>
  );
}
