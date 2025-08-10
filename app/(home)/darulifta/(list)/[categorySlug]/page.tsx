// app/daralfata/[slug]/page.tsx
import { metadata as siteMetadata } from "@/lib/constants";
import Daralfata from "@/components/darulifta/darulifta";

export async function generateMetadata() {
  return {
    title: "دارالافتاء",
    keywords: [
      "دارالافتاء",
      "اسلامی فتاوی",
      "شرعی رہنمائی",
      "اسلامی سوالات",
      "جامعہ اسلامیہ چمن",
      "علمی ادارہ",
      "Jamia Islamia Chaman",
      "Islamic Fatwa",
      "Sharia Guidance",
      "Islamic Questions",
      "DaralFata",
    ],
    description:
      "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن کے دارالافتاء سے مستند شرعی رہنمائی حاصل کریں۔ اپنے سوالات کے شرعی جوابات یہاں ملاحظہ کریں۔",
    metadataBase: new URL("https://jiallama.edu.pk"),
    alternates: {
      canonical: "https://jiallama.edu.pk/",
    },
    openGraph: {
      title: "دارالافتاء",
      description:
        "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن کے دارالافتاء سے مستند شرعی رہنمائی حاصل کریں۔ اپنے سوالات کے شرعی جوابات یہاں ملاحظہ کریں۔",
      images: siteMetadata.openGraph.images,
      url: `/darulifta/all`,
      siteName: "Jamia Islamia Chaman",
    },
  };
}

export default async function FatwaDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  try {
    let { categorySlug } = await params;
    return <Daralfata categorySlug={categorySlug} />;
  } catch (e) {
    return (
      <div className="text-center text-red-500 p-10">
        فتویٰ کی تفصیلات دستیاب نہیں۔
      </div>
    );
  }
}
