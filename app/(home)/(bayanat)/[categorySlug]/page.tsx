import BayantPage from "@/components/bayanat/bayanPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://jiallama.edu.pk"),
  alternates: {
    canonical: "https://jiallama.edu.pk/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Bayanat({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  return <BayantPage categorySlug={categorySlug} />;
}
