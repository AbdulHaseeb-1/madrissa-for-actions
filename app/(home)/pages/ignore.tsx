"use client";

import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionAbsenceCard from "@/components/general/questionAbsenceCard";
import TaarufnSection from "@/components/taaruf/TaarufSection";
import Seo from "@/components/Seo";

type Taaruf = {
  _id: string;
  title: string;
  subTitle: string;
  slug: string;
};

export default function Daralfata() {
  const [taaruf, setTaaruf] = useState<Taaruf[]>([]);

  useEffect(() => {
    const getTaarufs = async () => {
      try {
        const response = await axios.get("/taaruf");
        setTaaruf(response.data.taarufs || []);
        console.log(response.data);
      } catch (err) {
        toast.error("Failed to load Taarufs.");
      }
    };

    getTaarufs();
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto space-y-20 mb-20 relative overflow-hidden">
      <Seo />
      <SectionBanner title="تعارف جامعہ" />
      {/* <FilterBox /> */}
      <TaarufnSection taarufList={taaruf} />
      <div className="px-4 max-w-7xl mx-auto">
        <QuestionAbsenceCard />
      </div>
    </div>
  );
}
