import Link from "next/link";
import React from "react";
import he from "he";
import { URL } from "@/lib/url";

type Question = {
  slug: string;
  title: string;
  fatwaTitle?: string;
};

type Props = {
  category: {
    name: string;
    slug: string;
  };
  questions: Question[];
};

export default function QuestionCard({ category, questions }: Props) {
  return (
    <div className="flex flex-col w-full mx-auto mt-5 shadow-2xl rounded-3xl ">
      <div className="flex justify-between items-center px-4 py-3 text-white bg-[url('/images/pattern.webp')]  bg-cover bg-center rounded-t-2xl">
        <Link href={`${URL.PATH.DARULIFTA_BASE}/${category.slug}`}>
          <button className="text-[0.60rem] pt-2 hover:underline">
            تمام سوالات دیکھیں
          </button>
        </Link>
        <div className="mtext-base pt-2">{category.name}</div>
      </div>
      <div className="px-4 text-right">
        {questions.map((question, index) => (
          <div key={index} className="text-right">
            <div
              className={`flex flex-col  ${
                index === questions.length - 1
                  ? ""
                  : "border-b border-neutral-400"
              } justify-center items-end gap-2 py-3 `}
              dir="ltr"
            >
              <div className="text-base line-clamp-1 leading-11">
                {question.fatwaTitle}
              </div>
              <Link href={`${URL.PATH.READ_QUESTION}/${encodeURIComponent(question.slug)}`}>
                <p className="hover:underline text-base text-primary line-clamp-1 text-ellipsis leading-11 ">
                  {he.decode(question.title)}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
