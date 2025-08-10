import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { URL } from "@/lib/url";
import "@/public/css/root.css";

export default function FeatureCardSection() {
  return (
    <section className="container mx-auto md:py-12 px-4 sm:px-6 lg:px-8 xl:px-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  lg:gap-8 place-items-center">
        <FeatureCard
          icon="/images/home/quran-alt.svg"
          title=" بانی جامعہ"
          description="
          حضرت علامہ عبد الغنی 
          <span>
          (رحمة اللہ علیہ)
          </span>
           "
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
          navPath={URL.PATH.BAYANAT}
        />

        <FeatureCard
          icon="/images/home/people.svg"
          title=" مہتمم جامعہ"
          description="  مولانا حافظ محمد یوسف "
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
          navPath={URL.EXTRA_PATHS.MUHAMMAD_YOUSAF}
        />
        <FeatureCard
          icon="/images/home/arabic-art.svg"
          title="تعارف جامعہ"
          description="  جامعہ اسلامیہ علامہ ٹاون   "
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
          navPath={URL.EXTRA_PATHS.JAMIA_ISLAMIA}
        />
        <FeatureCard
          icon="/images/home/books.svg"
          title="دارالافتاء"
          description={`
            <p>
            دارالافتاء (آن لائن)، علامہ ٹاون چمن
            </p> 
          `}
          bgColor="bg-white"
          textColor="text-primary"
          borderColor="border-teal-600"
          navPath={URL.PATH.DARULIFTA}
        />
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  navPath: string;
};

function FeatureCard({
  icon,
  title,
  description,
  bgColor = "bg-white",
  borderColor = "border-transparent",
  textColor = "text-black",
  navPath,
}: FeatureCardProps) {
  return (
    <Card
      className={`inset-0 group grid ${bgColor} ${borderColor} md:border-4 shadow-md w-full h-auto min-h-[100px] sm:min-h-[200px] md:min-h-[202px] transition-all hover:shadow-xl hover:bg-gradient-to-br from-[#0F766E] via-[#025e56] to-[#04D9C8] duration-300`}
    >
      <Link href={navPath}>
        <CardContent className="flex flex-row justify-between items-center   sm:p-6 gap-4 sm:gap-6 h-full">
          <div className="flex-shrink-0 mb-4 sm:mb-0 ">
            <div className="bg-white rounded-full p-2 sm:p-3 flex items-center justify-center shadow-inner">
              <Image
                src={icon}
                width={80}
                height={80}
                alt={title}
                className="object-contain rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28"
              />
            </div>
          </div>
          <div
            className={`mt-3 text-right flex flex-col gap-2 sm:gap-4 transition-colors duration-300 group-hover:text-white ${textColor} rtl`}
            dir="rtl"
          >
            <h3
              style={{ margin: 0 }}
              className={`text-xl md:text-3xl m-0   leading-relaxed`}
            >
              {title}
            </h3>
            <div
              className={`description text-xl md:text-3xl leading-relaxed `}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
