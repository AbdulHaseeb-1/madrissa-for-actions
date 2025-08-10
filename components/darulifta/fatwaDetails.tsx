// components/daralfata/FatwaDetail.tsx
"use client";

import { FatwaDetails } from "@/types"; // optional: if you use separate types
import SectionBanner from "@/components/general/sectionBanner";
import RelatedQuestions from "@/components/darulifta/relatedQuestions";
import QuestionAbsenceCard from "@/components/general/questionAbsenceCard";
import { LucidePrinter } from "lucide-react";
import he from "he";
import "@/public/css/styles.css";
import { UrduDateParser } from "@/lib/utils";
import ShareButton from "../general/shareButton";
import { Button } from "../ui/button";

export default function FatwaDetail({
  fatwaDetails,
}: {
  fatwaDetails: FatwaDetails;
}) {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-[1920px] mx-auto bg-white font-[Jameel Noori Nastaleeq] text-right ">
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            padding: 20;
            size: auto;
          }
        }
      `}</style>

      <div className="no-print">
        <SectionBanner title="دارالافتاء" />
      </div>

      <div className="p-4 md:p-6 print-content px-4 md:px-10  ">
        {/* Header */}
        <div className="header flex flex-wrap  justify-end gap-5 md:gap-10 items-center text-lg md:text-xl lg:text-2xl text-primary mb-2 py-6">
          <div className="flex gap-3 items-center justify-center">
            <Button
              onClick={handlePrint}
              variant={"ghost"}
              className="no-print  flex items-center  text-primary rounded-md hover:bg-primary/10 transition-colors"
              aria-label="فتویٰ کے تفصیلات پرنٹ کریں"
            >
              <LucidePrinter size={28} />
              پرنٹ کریں
            </Button>
            <div className="inline no-print">
            <ShareButton />
            </div>
          </div>
          {fatwaDetails?.showDate === "true" && (
            <span className="flex gap-3 text-base">
              <UrduDateParser date={fatwaDetails.date} />
              <span>:تاریخ</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div className="question-box mb-2" dir="rtl">
          <p className="content leading-loose text-black text-xl md:text-2xl lg:text-2xl text-right">
            {he.decode(fatwaDetails.title)}
          </p>
        </div>
        <hr className="border-t border-primary" />

        {/* Question */}
        <div className="question-box mb-2" dir="rtl">
          <div className="title w-fit bg-primary text-white text-xl md:text-2xl  pt-4 pb-2 md:pt-5 md:pb-3 px-10 rounded-xl my-4">
            سوال
          </div>
          <p
            className="content leading-loose text-neutral-800 text-xl md:text-2xl lg:text-2xl text-right"
            dangerouslySetInnerHTML={{
              __html: he.decode(fatwaDetails.question),
            }}
          />
        </div>

        {/* Answer */}
        <div className="answer-box mb-6" dir="rtl">
          <div className="title w-fit bg-primary text-white text-xl md:text-2xl pt-4 pb-2 md:pt-5 md:pb-3 px-10 rounded-2xl md:my-6 my-4">
            جواب
          </div>
          <div
            className="content text-neutral-800 text-xl md:text-2xl lg:text-3xl leading-loose text-right"
            dangerouslySetInnerHTML={{
              __html: he.decode(fatwaDetails.answer),
            }}
          />
        </div>

        {/* Footer */}
        <div className="footer border-t py-10 border-gray-300 text-lg md:text-xl lg:text-2xl text-primary mb-6 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          <span>دارالافتاء : جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن</span>
          <span dir="rtl">فتویٰ نمبر: {fatwaDetails.fatwaNumber}</span>
        </div>

        {/* Related Questions */}
        <div className="no-print">
          <RelatedQuestions
            fatwaDetails={{
              questionSlug: fatwaDetails.slug,
              categorySlug: fatwaDetails.categorySlug,
            }}
          />
        </div>
      </div>

      {/* Absence Card */}
      <div className="no-print max-w-4xl mx-auto py-20 px-4">
        <QuestionAbsenceCard />
      </div>
    </div>
  );
}
