import MainNavigation from "@/components/layout/main-navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}
