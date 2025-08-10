import Link from "next/link";
import React from "react";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import he from "he";
import { URL } from "@/lib/url";

type Question = {
  slug: string;
  question: string;
  title: string;
};

export default function QuestionSection({
  questions,
  setPage,
  page,
}: {
  questions: Question[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}) {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background with overlay */}

      <div className="absolute inset-0 bg-[url('/images/pattern.webp')] bg-contain  z-0" />
     {/* <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 backdrop-blur-xs" /> */}
     {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="rounded-3xl shadow-2xl  lg:p-12">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <div className="relative bg-primary text-white text-3xl pt-5 pb-2 px-16  md:text-4xl  sm:h-20 rounded-xl  grid place-content-center shadow-lg">
              <div className="">سوالات</div>
            </div>
          </div>

          {/* Questions */}
          <div className="flex flex-col  gap-4 text-right">
            {questions.map((question: any, i: number) => (
              <Link key={i} href={`${URL.PATH.READ_QUESTION}/${encodeURIComponent(question.slug)}`} className="group">
                <div className="relative p-0 md:p-1 bg-gradient-to-l from-[#b2f5ea] via-[#9CFFF7] to-[#81e6d9]/90 border-none hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl group cursor-pointer">
                  {/* Chevron Icon */}
                  <div className="flex items-center gap-4 py-5 px-6">
                    {/* Text Content */}
                    <div className="flex justify-end w-full ">
                      <div className="flex justify-end lg:w-[95%]">
                        <h3
                          style={{
                            margin: 0,
                            // lineHeight: "3rem",
                          }}
                          dir="rtl"
                          className="text-base md:text-2xl lg:text-2xl font-normal text-right leading-9 md:leading-14 h-full     "
                        >
                          {he.decode(question?.title)}
                        </h3>
                      </div>
                    </div>

                    {/* Numbered badge */}
                    <div className=" rounded-full text-primary grid place-content-center ">
                      <VscDebugBreakpointLogUnverified className="h-7 w-7" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View more button */}
          <div className="mt-8 flex justify-center gap-2">
            <button
              disabled={page == 1 ? true : false}
              onClick={() => setPage((page: number) => page - 1)}
              className="disabled:bg-neutral-500  bg-primary hover:bg-primary/80 text-white  pt-5 pb-3 px-5 md:px-8 rounded-full shadow-lg transition duration-300"
            >
              پچھلے سوالات لوڈ کریں۔
            </button>
            <button
              disabled={questions.length < 10 ? true : false}
              onClick={() => setPage((page: number) => page + 1)}
              className="disabled:bg-neutral-500 bg-primary hover:bg-primary/80 text-white pt-5 pb-3 px-5 md:px-8 rounded-full shadow-lg transition duration-300"
            >
              نئے سوالات لوڈ کریں۔
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
