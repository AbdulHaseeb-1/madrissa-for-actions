"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import QuestionCard from "@/components/darulifta/questionCard";

type Question = {
  slug: string;
  title: string;
  fatwaTitle?: string;
};

type CategoryGroup = {
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  questions: Question[];
};

export default function QuestionGroupCards() {
  const [groupedQuestions, setGroupedQuestions] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    async function fetchGroupedQuestions() {
      try {
        const res = await axios.get("/random/question-by-fixed-categories");
        setGroupedQuestions(res?.data?.data || []); // API returns data inside `.data`
      } catch (err) {
        // console.error(err);
        // toast.error("Failed to fetch questions.");
      }
    }

    fetchGroupedQuestions();
  }, []);

  return (
    <div className="mx-auto space-y-20 mb-20 relative overflow-hidden pb-20">
      <div className=" container mx-auto grid md:grid-cols-2  lg:grid-cols-3 gap-x-6 lg:gap-x-15 px-4 ">
        {groupedQuestions.map((group, index) => (
          <QuestionCard
            key={index}
            category={group.category}
            questions={group.questions}
          />
        ))}
      </div>
    </div>
  );
}
