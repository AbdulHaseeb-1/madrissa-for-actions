"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import he from "he";
import clsx from "clsx";
import { URL } from "@/lib/url";
import { UrduDateParser } from "@/lib/utils";

type Question = {
  _id: string;
  question: string;
  date: string;
  slug: string;
  title: string;
  showDate: string;
};

export default function QuestionSection() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/questions?limit=6");
        setQuestions(res.data.questions || []);
      } catch (error) {
        // console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <section className="w-full py-12 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/pattern.webp')] bg-cover bg-center z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 rounded-2xl shadow-xl px-4 sm:px-6 pt-6">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary text-white text-2xl sm:text-2xl md:text-4xl pt-5 pb-1 rounded-xl px-4 sm:px-8 text-center w-full max-w-xs sm:max-w-md">
              نئے سوالات
            </div>
          </div>

          {/* Questions */}
          <div className="text-right space-y-2 pb-10">
            {loading ? (
              <p className="text-center text-lg">لوڈ ہو رہا ہے...</p>
            ) : questions.length === 0 ? (
              <p className="text-center text-xl text-gray-600">
                فی الحال کوئی سوال دستیاب نہیں ہے۔
              </p>
            ) : (
              questions.map((question) => (
                <Card
                  key={question._id}
                  className={clsx(
                    `border-0 border-b-2 border-neutral-300 shadow-none rounded-xl bg-transparent px-0 `,
                    question.showDate == "false" ? "pt-4" : ""
                  )}
                >
                  <CardContent className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 px-4 sm:px-5 py-0">
                    {/* Button */}
                    <div
                      className={clsx(
                        `md:order-0 order-1  place-self-start md:place-self-center`
                      )}
                    >
                      <Link
                        href={`${URL.PATH.READ_QUESTION}/${encodeURIComponent(
                          question.slug
                        )}`}
                        className="text-primary text-lg md:text-xl hover:underline "
                      >
                        مزید پڑھیں
                      </Link>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-2">
                      {question.showDate == "true" && (
                        <div className="md:text-lg text-neutral-600 flex  gap-2" dir="rtl">
                          <span className="pl-2">  تاریخ :</span>
                          <div>
                          <UrduDateParser date={question.date} />
                          </div>
                        </div>
                      )}
                      <div className="overflow-hidden inset-0">
                        <h3
                          dir="rtl"
                          style={{ margin: 0 }}
                          className=" text-xl md:text-2xl font-medium pt-5  text-ellipsis text-right leading-12 "
                        >
                          {
                          // question.title.length > 140
                            // ? he.decode(question.title.slice(0, 140) + "...")
                            // :
                             he.decode(question.title)}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* See All Button */}
            {!loading && questions.length > 0 && (
              <div className="flex justify-center mt-8">
                <Link
                  href={URL.PATH.DARULIFTA}
                  className="bg-primary text-white text-lg md:text-xl px-6 pt-6 pb-2 rounded-xl hover:bg-primary/90 transition-all duration-300"
                >
                  تمام سوالات دیکھیں
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
