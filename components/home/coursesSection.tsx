"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Loading from "../general/loading";
import { useRouter } from "next/navigation";
import { AlertCircle, BookOpen } from "lucide-react";

interface Course {
  _id: number;
  title: string;
  description: string;
  slug: string;
  subTitle:string;
  imageUrl: string;
}

const EmptyState = () => (
  <div className="text-center py-16">
    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-medium text-gray-500 mb-2">
      کوئی کورس موجود نہیں ہے
    </h3>
    <p className="text-gray-400">
      ابھی کوئی کورس دستیاب نہیں ہے، جلد ہی نئے کورسز شامل کیے جائیں گے
    </p>
  </div>
);

const ErrorState = () => (
  <div className="text-center py-16">
    <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
    <h3 className="text-xl font-medium text-gray-500 mb-2">خرابی ہوئی ہے</h3>
    <p className="text-gray-400">
      کچھ غلط ہو گیا ہے، براہ کرم دوبارہ کوشش کریں
    </p>
  </div>
);

export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getCourses = async () => {
    try {
      const response = await axios.get("/courses", { timeout: 10000 });
      setCourses(response.data);
    
      setLoading(false);
    } catch (err: unknown) {
      console.log(err);
      
      if (err instanceof Error) {
        setError(err.message.toString());
      } else {
        setError("Unknown error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCourses();
  }, []);

  return (
    <section className="bg-white w-full  ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-2xl md:text-4xl text-center mb-12 text-primary">
          تعلیمی شعبہ جات
        </h2>

        {loading && <Loading />}

        {error && <ErrorState />}

        {!loading && !error && courses.length === 0 && <EmptyState />}

        {!loading && !error && courses.length > 0 && (
          <div className=" flex gap-6 overflow-x-auto w-full pb-10 scroll-smooth  scrollbar-hide">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="relative overflow-hidden shadow-xl p-0 flex-none w-[80vw] md:w-80 h-auto mx-auto snap-start rounded-none"
              >
                <div className="relative w-full h-auto">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full aspect-auto object-center "
                  />
                </div>
                <div className="flex flex-col justify-center items-center py-6 px-4">
                  <CardContent className="text-center -mt-4 ">
                    <h3 className="text-lg font-light text-black mb-4">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.subTitle}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-sm w-24 border-black text-black hover:bg-primary hover:border-primary hover:text-white "
                      onClick={() => router.push(`/courses/${course.slug}`)}
                    >
                    مزید جانیں
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
