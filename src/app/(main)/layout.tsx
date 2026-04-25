import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: 'Sperx',
  description: 'Sperx Loyalty App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="h-full bg-gray-100 flex justify-center">
        {children}
      </body>
    </html>
  );
}
