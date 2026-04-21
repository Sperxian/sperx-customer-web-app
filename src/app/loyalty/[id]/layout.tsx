import type { Metadata } from "next";
import "../../globals.css";
import { LOYALTY_PROGRAM_NAME, SHOP_NAME } from "@/lib";

export const metadata: Metadata = {
  title: SHOP_NAME,
  description: LOYALTY_PROGRAM_NAME,
};

export default function FullLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="h-full bg-gray-100 flex justify-center">
        {/* phone shell */}
        <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl bg-white shadow flex flex-col overflow-hidden">

          {/* scroll area wrapper */}
          <div className="flex-1 relative overflow-hidden">

            {/* actual scroll container */}
            <main className="h-full overflow-y-auto pb-10">
              {children}
            </main>

            {/* bottom fade indicator */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white via-white/75 via-white/30 to-transparent" />
          </div>
        </div>
      </body>
    </html>
  );
}
