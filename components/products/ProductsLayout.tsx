import { ReactNode } from "react";

interface ProductsLayoutProps {
  children: ReactNode;
}

export function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-saira">
      {children}
    </div>
  );
} 