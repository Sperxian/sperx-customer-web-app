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
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="h-full bg-gray-100 flex justify-center">
        {/* phone shell */}
        <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl bg-background md:border md:border-gray-400 md:dark:border-gray-800 shadow flex flex-col overflow-hidden">

          {/* scroll area wrapper */}
          <div className="flex-1 relative overflow-hidden">

            {/* actual scroll container */}
            <main className="h-full overflow-y-auto">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}
