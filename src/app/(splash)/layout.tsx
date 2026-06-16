import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SperX",
  description: "SperX App",
};

export default function FullLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 relative overflow-hidden">
      <main className="h-full overflow-y-auto">{children}</main>
    </div>
  );
}
