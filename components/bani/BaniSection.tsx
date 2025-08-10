import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Bani = {
  _id: string;
  name: string;
  specialization: string;
  slug: string;
};

export default function BaninSection({ baniList }: { baniList: Bani[] }) {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background with overlay */}

      <div className="absolute inset-0 bg-[url('/images/pattern.webp')] bg-contain  z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="rounded-3xl shadow-2xl  lg:p-12">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <div className="relative bg-primary text-white font-bold text-4xl pb-3 sm:text-4xl md:text-4xl h-16 sm:h-20 rounded-xl w-60 sm:w-72 grid place-content-center shadow-lg">
              <div className="mt-4">بانی کی فہرست</div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4 text-right" style={{ margin: 0 }}>
            {baniList.map((bani: Bani, i: number) => (
              <Card
                key={i}
                className="relative p-0 md:p-4 bg-gradient-to-l from-[#b2f5ea] via-[#9CFFF7] to-[#81e6d9]/70 border-none hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl group cursor-pointer"
              >
                {/* Chevron Icon */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-6 top-1/2 -translate-y-1/2">
                  <ChevronLeft size={28} className="text-primary" />
                </div>

                <Link href={`/baniJamia/${bani.slug}`}>
                  <CardContent className="flex items-center gap-4 py-5 px-6">
                    {/* Text Content */}
                    <div className="flex justify-end w-full ">
                      <div className="flex justify-end">
                        <h3
                          dir="rtl"
                          className="text-xl md:text-2xl lg:text-3xl font-normal text-right line-clamp-1"
                          style={{
                            margin: 0,
                            // lineHeight: "3rem",
                          }}
                        >
                          {bani.specialization}--------------- {bani.name}
                        </h3>
                      </div>
                    </div>

                    {/* Numbered badge */}
                    <div className="flex-shrink-0 md:text-xl w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 text-primary grid place-content-center font-bold border-2 border-primary pt-1 ">
                      {i + 1}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* View more button */}
          {/* <div className="mt-8 flex justify-center">
            <button className="bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
              مزید دیکھیں
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
