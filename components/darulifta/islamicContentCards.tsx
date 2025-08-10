"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IslamicContentCards() {
  return (
    <div className=" w-full flex flex-col items-center justify-center p-4 ">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Card */}
        <Card className="overflow-hidden border-0 shadow-md bg-[url('/images/pattern.webp')] bg-contain">
          <CardHeader className="relative z-10">
            <CardTitle className="place-self-end  text-2xl w-fit  bg-white/80   rounded-full px-10 pt-2 text-black">
              <div>تلاش</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-3 p-4">
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-xl transition-colors">
              قرآن، علوم قرآن
            </div>
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-xl transition-colors">
              حدیث و علوم حدیث
            </div>
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-xl transition-colors">
              سیرت و تاریخ
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-md bg-[url('/images/pattern.webp')] bg-contain">
          <CardHeader className="relative z-10">
            <CardTitle className="place-self-end  text-2xl w-fit  bg-white/80   rounded-full px-10 pt-2 text-black">
              موضوعات
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-3 p-4">
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-lg md:text-xl transition-colors">
              خاص نمبر
            </div>
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-lg md:text-xl transition-colors">
              حضرت نوری رحمہ اللہ کے قلمی مضامین
            </div>
            <div className="w-full py-3 px-6 bg-neutral-200  hover:bg-gradient-to-b hover:from-[#0F766E] hover:to-[#1CDCCD] text-black rounded-full text-lg md:text-xl transition-colors">
              حضرت کے علمی و تحقیقی مقالات
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
