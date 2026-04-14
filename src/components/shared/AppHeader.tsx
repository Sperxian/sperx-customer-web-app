// import { CoffeeCup } from "./loyalty-card/CoffeeCup";

import { LOYALTY_PROGRAM_NAME, SHOP_NAME } from "@/lib";
import Image from "next/image";

export function AppHeader() {
  const loyaltyProgramName = LOYALTY_PROGRAM_NAME.toUpperCase();
  const shopName = SHOP_NAME;
  const iconLocation = "/barako-cafe/icon.svg";

  return (
    // <header className="flex items-center gap-3 bg-[var(--primary)] px-4 py-3 flex-shrink-0">
    <header className="flex items-center gap-3 bg-primary px-4 py-3 flex-shrink-0">
      <Image
        className="dark:invert bg-white rounded-full object-cover"
        src={iconLocation}
        alt={shopName}
        width={36}
        height={36}
        priority
      />
      <div>
        <h1
          className="text-white text-3xl font-medium leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {shopName}
        </h1>
        <p className="text-white text-xs tracking-widest uppercase font-medium">
          {loyaltyProgramName}
        </p>
      </div>
    </header>
  );
}
