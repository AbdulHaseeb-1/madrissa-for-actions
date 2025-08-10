"use client";
import FilterBox from "@/components/darulifta/FilterArea";
import QuestionAbsenceCard from "@/components/general/questionAbsenceCard";
import QuestionSection from "@/components/darulifta/questions";
import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import QuestionGroupCards from "@/components/darulifta/groupQuestionCards";

type Question = {
  slug: string;
  question: string;
  title: string;
};


export default function Daralfata({categorySlug}:{categorySlug: string}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await axios.get(
          `/questions/${categorySlug}?limit=${limit}&page=${page}`
        );
        const data = response.data.questions;
        setQuestions(data);
      } catch (err) {
        // toast.error("Questions fetching failed");
      }
    }

    getQuestions();
  }, [page, categorySlug]);

  return (
    <div className="max-w-[1920px] mx-auto space-y-20 mb-20 relative overflow-hidden  ">
      <div>
        <SectionBanner title="دارالافتاء" />
        <FilterBox />
        <QuestionSection questions={questions} setPage={setPage} page={page} />
      </div>
      <div className="  gap-x-4 px-4 ">
        <QuestionGroupCards />
      </div>
      <div className="px-4 max-w-7xl mx-auto">
        <QuestionAbsenceCard />
      </div>
    </div>
  );
}
