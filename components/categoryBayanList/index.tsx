import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Star } from "lucide-react";

interface Bayan {
  id: string;
  title: string;
}

export default function QuestionSection(list: Bayan[]) {
  const questions = [
    {
      id: 1,
      title:
        "محض نام سے ہبہ تام نہیں ہوتا، بیوہ دو بیٹوں اور چار بیٹوں میں وراثت کی تقسیمجامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
    },
    {
      id: 2,
      title: "طلاق کے ناقص جملے سے طلاق کا حکم",
    },
    {
      id: 3,
      title: "مسجد کا چندہ کسی کو قرض دینا",
    },
    {
      id: 4,
      title: "دوسری شادی کا شرعی جواز اور طلاق کے غیر ضروری مطالبے کی ممانعت",
    },
    {
      id: 5,
      title: "زندگی میں جائیداد تقسیم کرنا",
    },
    {
      id: 6,
      title: "بھائی کو زکاۃ دینےکا حکم",
    },
    {
      id: 7,
      title: "تین طلاق/عدت کے دوران مصروفیت کی وجہ سے ملازمت اختیار کرنا",
    },
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background with overlay */}

      <div className="absolute inset-0 bg-[url('/images/pattern.webp')] bg-contain  z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="rounded-3xl shadow-2xl  lg:p-12">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <div className="relative bg-primary text-white font-bold text-4xl pb-3 sm:text-4xl md:text-5xl h-16 sm:h-20 rounded-xl w-60 sm:w-72 grid place-content-center shadow-lg">
              <div className="mt-4">سوالات</div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4 text-right">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="relative p-0 md:p-4 bg-gradient-to-l from-[#b2f5ea] via-[#9CFFF7] to-[#81e6d9]/70 border-none hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl group cursor-pointer"
              >
                <CardContent className="flex items-center gap-4 py-5 px-6">
                  {/* Text Content */}
                  <div className="flex justify-end w-full ">
                    <h3 className="text-xl md:text-3xl lg:text-4xl leading-relaxed font-medium text-gray-800">
                      {question.title}
                    </h3>
                  </div>

                  {/* Numbered badge */}
                  <div className="flex-shrink-0 md:text-xl w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 text-primary grid place-content-center font-bold border-2 border-primary pt-1 ">
                    <Star />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View more button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
              مزید سوالات دیکھیں
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
