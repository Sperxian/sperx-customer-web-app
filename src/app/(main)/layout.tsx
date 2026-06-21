import "@/app/globals.css";
import ClerkProviderWrapper from "./member/ClerkProviderWrapper";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClerkProviderWrapper>{children}</ClerkProviderWrapper>;
}
