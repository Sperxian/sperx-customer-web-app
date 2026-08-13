"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return <ClerkProvider afterSignOutUrl={pathname}>{children}</ClerkProvider>;
}
