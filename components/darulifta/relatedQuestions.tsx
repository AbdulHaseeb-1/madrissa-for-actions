"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import he from "he";
import { URL } from "@/lib/url";

interface RelatedQuestion {
  id: number;
  title: string;
  slug: string;
}

export default function RelatedQuestions({
  fatwaDetails,
}: {
  fatwaDetails: {
    categorySlug: string;
    questionSlug: string;
  };
}) {
  const [relatedQuestions, setRelatedQuestions] = useState<RelatedQuestion[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRelatedQuestions() {
      try {
        const response = await axios.get(
          `/questions/related/${fatwaDetails.categorySlug}`
        );
        const data = response.data;
        const filtered = data.filter(
          (item: any) => item.slug !== fatwaDetails.questionSlug
        );

        setRelatedQuestions(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related questions:", error);
        setLoading(false);
      }
    }

    fetchRelatedQuestions();
  }, [fatwaDetails]);

  if (loading) {
    return (
      <div className="p-6 text-center text-primary">
        متعلقہ سوالات لوڈ ہو رہے ہیں...
      </div>
    );
  }

  return (
    <div className="space-y-2" dir="rtl">
        <div className="title w-fit bg-primary text-white text-2xl md:text-2xl  pt-4 pb-1.5 md:pt-5 md:pb-3 px-8 rounded-xl my-8">
           متعلقہ سوالات
      </div>
      <ul className="text-xl flex flex-col md:text-2xl lg:text-2xl text-primary space-y-5 pt-5">
        {relatedQuestions.map((question, i) => (
          <li
            key={i}
            className="border-b py-1  w-fit lg:w-4/5  list-none leading-loose"
          >
            <Link href={`${URL.PATH.READ_QUESTION}/${encodeURIComponent(question.slug)}`} key={i}>
              {he.decode(question.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
