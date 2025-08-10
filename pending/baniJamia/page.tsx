"use client";

import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import QuestionAbsenceCard from "@/components/general/questionAbsenceCard";
import BaninSection from "@/components/bani/BaniSection";

type Bani = {
  _id: string;
  name: string;
  specialization: string;
  slug: string;
};

export default function Daralfata() {
  const [banis, setBanis] = useState<Bani[]>([]);

  useEffect(() => {
    const getBanis = async () => {
      try {
        const response = await axios.get("/bani");
        setBanis(response.data.banis || []);
      } catch (err) {
        toast.error("Failed to load Banis.");
      }
    };

    getBanis();
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto space-y-20 mb-20 relative overflow-hidden">
      <SectionBanner title="بانی جامعہ" />

      {/* <FilterBox /> */}
      <BaninSection baniList={banis} />
      <div className="px-4 max-w-7xl mx-auto">
        <QuestionAbsenceCard />
      </div>
    </div>
  );
}
