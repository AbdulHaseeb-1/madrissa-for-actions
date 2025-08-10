import Form from "@/components/general/form";
import SectionBanner from "@/components/general/sectionBanner";
import { metadata } from "@/lib/constants";
import React from "react";

export async function generateMetadata() {
  return {
    title: "سوال پوچھیں",
     metadataBase: new URL("https://jiallama.edu.pk"),
    alternates: {
      canonical: "https://jiallama.edu.pk/",
    },
    keywords: [
      "سوال پوچھیں",
      "دینی مسائل",
      "شرعی مسائل",
      "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن",
      "علمی رہنمائی",
      "Ask Questions",
      "Islamic Questions",
      "Shariah Issues",
    ],
    description:
      "اپنے دینی و شرعی مسائل کے جوابات حاصل کریں۔ جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن کے مستند علما سے سوال پوچھنے کے لیے یہ صفحہ استعمال کریں۔",
      openGraph: {
      title: "سوال پوچھیں",
      description:
        "اپنے دینی و شرعی مسائل کے جوابات حاصل کریں۔ جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن کے مستند علما سے سوال پوچھنے کے لیے یہ صفحہ استعمال کریں۔",
      images: metadata.openGraph.images,
      url: `${metadata.openGraph.url}/user-questions`,
      siteName: "Jamia Islamia Chaman",
    },
  };
}

export default function QuestionForm() {
  return (
    <div className="max-w-[1920px] mx-auto space-y-5 bg-white text-right pb-10">
      <SectionBanner title="سوال پوچھیں" />
      <div className="space-y-5 p-6 container mx-auto">
        <div className="text-3xl lg:text-5xl text-primary "> ہدایات</div>
        <hr />
        <div className=" my-10 tracking-wide  lg:text-2xl leading-10 ">
          برائے کرم سوال ارسال کرتے وقت ان نکات کا خیال رکھیں
        </div>

        <ul
          dir="rtl"
          className="  lg:space-y-5 tracking-wide  lg:*:text-2xl  "
          style={{
            font: "var(--font-urdu)",
            lineHeight: "2.3rem",
            listStyle: "initial",
            listStylePosition: "inside",
            listStyleType: "square",
          }}
        >
          <li>فرضی اور بے مقصد سوالات سے گریز کیجیے۔</li>
          <li>
            سوال اردو رسم الخط میں لکھیں، اگر ممکن نہ ہو تو رومن اردو بھی قبول
            ہے۔
          </li>
          <li>
            مسئلے کو واضح انداز میں بیان کریں۔ اگر مزید وضاحت درکار ہو تو
            دارالافتاء کی درخواست پر مکمل جواب دیں۔
          </li>
          <li>ہر بار صرف ایک سوال بھیجیں، دوسرا سوال علیحدہ بھیجیں۔</li>
          <li>
            صرف ضروری اور عملی نوعیت کے سوالات پوچھیں، غیر ضروری سوالات سے گریز
            کریں۔
          </li>
          <li>
            عام مسائل کا جواب دو ہفتے تک مل سکتا ہے۔ تفصیلی مسائل میں زیادہ وقت
            لگ سکتا ہے۔ جواب آن لائن میسیج کے ذریعے موصول ہوگا۔
          </li>
        </ul>
      </div>
      <div className="px-4 max-w-5xl mx-auto">
        <Form />
      </div>
    </div>
  );
}
