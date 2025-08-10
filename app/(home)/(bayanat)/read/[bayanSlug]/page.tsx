"use client";
import "@/public/css/styles.css";
import he from "he";
import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import { LucidePrinter } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UrduDateParser } from "@/lib/utils";

export default function BayanDetails() {
  const [bayan, setBayan] = useState<any>(null);
  const { bayanSlug } = useParams();

  useEffect(() => {
    async function getBayan() {
      try {
        const response = await axios.get(`/bayans/details/${bayanSlug}`);
        setBayan(response.data);
      } catch (error) {
        console.error("Error fetching bayan:", error);
      }
    }
    getBayan();
  }, [bayanSlug]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1920px] content mx-auto bg-white font-[Jameel Noori Nastaleeq] text-right">
      <style jsx global>{`
        @media print {
          /* Suppress browser headers and footers */
          @page {
            margin: 0;
            size: auto;
          }     
      `}</style>

      <div className="no-print">
        <SectionBanner title={bayan?.title || ""} />
      </div>
      {bayan ? (
        <div className="p-6 print-content  px-4 md:px-10 " dir="rtl">
          {/* Header */}
          <div className="header flex   flex-wrap md:justify-start gap-10 items-center text-base md:text-xl lg:text-2xl text-primary mb-2 pt-4 pb-6">
            {bayan?.bani && (
              <div className="flex gap-3">
                <span>مصنف</span>
                {bayan?.bani}
              </div>
            )}
            {bayan.showDate && (
              <div className="flex gap-3">
                <span>تاریخ:</span>
             <UrduDateParser date={bayan.date} />
                 </div>
            )}
            <button
              onClick={handlePrint}
              className="no-print flex items-center gap-2 text-primary px-4 py-2 rounded-md transition-colors"
            >
              <LucidePrinter size={20} />
              پرنٹ کریں
            </button>
          </div>

          {/* Question Title */}
          <h1
            className="text-xl md:text-2xl lg:text-3xl text-primary leading-relaxed border-b mb-4 py-6"
            dangerouslySetInnerHTML={{ __html: he.decode(bayan?.title) }}
          />

          {/* Question Box */}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: he.decode(bayan?.tafseel) }}
          />

          {/* Absence Card */}
          {/* <div className="no-print max-w-4xl mx-auto py-20">
            <QuestionAbsenceCard />
          </div> */}
        </div>
      ) : (
        <div className="p-6 text-center text-primary">
          بیان لوڈ ہو رہا ہے...
        </div>
      )}
    </div>
  );
}
