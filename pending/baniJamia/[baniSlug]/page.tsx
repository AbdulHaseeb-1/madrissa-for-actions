"use client";

import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import { LucidePrinter } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/public/css/styles.css";
import he from "he";

export default function BaniDetails() {
  const { baniSlug } = useParams(); // Consider renaming this route param if it's no longer related to questions
  const [baniDetails, setBaniDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchBaniDetails() {
      try {
        const response = await axios.get(`/bani/details/${baniSlug}`);
        setBaniDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching bani details:", error);
      }
    }
    fetchBaniDetails();
  }, [baniSlug]);

  return (
    <div className="text-right">
      <SectionBanner title="بانی جامعہ" />
      {baniDetails && (
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="no-print flex justify-between md:justify-end items-center gap-10 text-primary text-lg md:text-xl lg:text-2xl py-6 mb-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              <LucidePrinter />
              <span>پرنٹ</span>
            </button>
          </div>

          {/* Bani Name */}
          <div className="print-content">
            <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl leading-relaxed  pt-6">
              {baniDetails.name}
            </h1>
            <div className="text-xl">{baniDetails.specialization}</div>
            <div className="text-xl">{baniDetails.email}</div>
            <hr />
          </div>
          {/* Bani Bio / Description */}
          <div className="mb-6 print-content" dir="rtl">
            <div className="w-fit bg-primary text-white text-2xl md:text-3xl lg:text-4xl py-3 px-8 rounded-2xl my-8">
              تعارف
            </div>
            <div
              className="content "
              dangerouslySetInnerHTML={{
                __html:
                  he.decode(baniDetails.about) || "مزید معلومات دستیاب نہیں۔",
              }}
            />
          </div>

          {/* Additional Info */}
          <div className="border-t py-10 border-gray-300 text-lg md:text-xl lg:text-2xl text-primary mb-6 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
            {/* <span>کل فتاویٰ: {baniDetails.totalFatwas}</span>
            <span>ادارہ: {baniDetails.institution}</span> */}
          </div>
        </div>
      )}
    </div>
  );
}
