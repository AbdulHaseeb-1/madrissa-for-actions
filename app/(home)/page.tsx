import HomeCarousel from "@/components/home/carousel";
import CourseSection from "@/components/home/coursesSection";
import FeatureCardSection from "@/components/home/featureCardSection";
import QuestionSection from "@/components/home/questtionsSection";
import { metadata } from "@/lib/constants";
import dynamic from "next/dynamic";
import React from "react";

let PrayerTimesSection = dynamic(() => import("@/components/home/prayerTimesSection"), {
  ssr: true,
});


export async function generateMetadata()  {
  return {
    title:metadata.title,
    description: "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن کی آفیشل ویب سائٹ۔ داخلہ، کورسز، اوقاتِ کار اور دیگر معلومات کے لیے مکمل رہنمائی حاصل کریں۔",
    metadataBase: new URL("https://jiallama.edu.pk"),
    alternates: {
      canonical: "https://jiallama.edu.pk/",
    },
    openGraph: {
      title:metadata.openGraph.title,
      description:metadata.openGraph.description,
      images: metadata.openGraph.images,
      url: "/",
      siteName: "Jamia Islamia Chaman",
    },

  }
}

export default function HomePage() {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full overflow-hidden">

      <div className="mx-auto space-y-10 ">
        <div className="w-screen ">
          <HomeCarousel />
        </div>
        <div className="max-w-[1920px] mx-auto space-y-20">
          <FeatureCardSection />
          <QuestionSection />
          <div className="max-w-screen" id="courses">
            <CourseSection />
          </div>
          <PrayerTimesSection />
        </div>
      </div>
    </div>
  );
}
