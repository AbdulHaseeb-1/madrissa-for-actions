import React from "react";
import MapSection from "@/components/rabta/mapSection";
import ContactInfo from "@/components/rabta/contactInfo";
// import BankAccounts from "@/components/rabta/BankAccounts";
import SectionBanner from "@/components/general/sectionBanner";
import Seo from "@/components/Seo";
import { metadata } from "@/lib/constants";

export async function generateMetadata() {
  return {
    title: " رابطہ",
    description:
      "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن سے رابطہ کے لیے ہماری مکمل معلومات یہاں دستیاب ہیں۔ داخلے، تعلیمی کورسز، اوقاتِ کار یا کسی بھی سوال کے لیے ہم سے فون، ای میل یا پتہ کے ذریعے آسانی سے رابطہ کریں۔",
    metadataBase: new URL("https://jiallama.edu.pk"),
    alternates: {
      canonical: "https://jiallama.edu.pk/",
    },
    openGraph: {
      title: " رابطہ",
      description:
        "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن سے رابطہ کے لیے ہماری مکمل معلومات یہاں دستیاب ہیں۔ داخلے، تعلیمی کورسز، اوقاتِ کار یا کسی بھی سوال کے لیے ہم سے فون، ای میل یا پتہ کے ذریعے آسانی سے رابطہ کریں۔",
      images: metadata.openGraph.images,
      url: `/contact`,
      siteName: "Jamia Islamia Chaman",
    },
  };
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo title="رابطہ" />
      <main className="flex-1">
        <SectionBanner title="رابطہ" />
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <MapSection />
          <ContactInfo />
          {/* <BankAccounts /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
