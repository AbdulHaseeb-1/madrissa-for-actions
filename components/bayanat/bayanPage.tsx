"use client";

import BayantSection from "@/components/bayanat/bayanList";
import SectionBanner from "@/components/general/sectionBanner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import NotFound from "@/app/not-found";

export default function BayantPage({ categorySlug }: { categorySlug: string }) {
  const [category, setCategory] = useState<string>("");
  const [bayans, setBayans] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [loading,setLoading] = useState<boolean>(true);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        `/bayans/${categorySlug}?page=${page}&limit=${limit}`
      );
      const data = response.data;
      setCategory(data.category);
      setBayans(data.bayans);  
      setLoading(false);
    }
    fetchData();
  }, [categorySlug, page, limit]);

  // If no bayans are found, show not found page
  if (!loading && (!category || bayans.length === 0)) {
    return <NotFound />;
  }

  return (
    <div className=" bg-white text-right max-w-[1920px] mx-auto ">
      <SectionBanner title={category} />
      <BayantSection bayans={bayans} setPage={setPage} page={page} />
    </div>
  );
}
