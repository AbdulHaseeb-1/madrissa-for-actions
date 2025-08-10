import Footer from "@/components/general/footer";
import Header from "@/components/general/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className=" flex-1 ">{children}</div>
      <div className="overflow-hidden">
      <Footer />
      </div>
    </div>
  );
}
