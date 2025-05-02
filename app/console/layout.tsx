import { ConsoleAuthWrapper } from "@/components/console/ConsoleAuthWrapper";

export default function ConsoleRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsoleAuthWrapper>
      {children}
    </ConsoleAuthWrapper>
  );
} 