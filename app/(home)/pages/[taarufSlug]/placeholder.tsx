// app/(taaruf)/taaruf/details/[taarufSlug]/page.tsx
import SectionBanner from "@/components/general/sectionBanner";
import TaarufSidebarMenu from "@/components/taaruf/taarufSideBar";

export const metadata = {
  title: "تعارف کی تفصیل – جلد آ رہی ہے",
  description:
    "یہ صفحہ فی الحال دستیاب نہیں ہے۔ براہ کرم بعد میں دوبارہ ملاحظہ کریں۔",
  metadataBase: new URL("https://jiallama.edu.pk"),
  alternates: {
    canonical: "https://jiallama.edu.pk/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TaarufDetailsPlaceholder() {
  return (
    <div className="text-right max-w-[1920px] mx-auto space-y-10 relative overflow-hidden">
      <SectionBanner title="تفصیل دستیاب نہیں" />
      <div className="flex flex-col lg:grid lg:grid-cols-10 gap-2">
        <div className="pl-4 md:pl-5 pr-4 col-span-8">
          <div className="print-content py-2 mb-4">
            <h1 className="text-primary text-xl md:text-2xl lg:text-3xl leading-relaxed">
              تعارف کی تفصیل
            </h1>
            <br />
            <hr />
          </div>

          <div className="mb-6 print-content" dir="rtl">
            <p className="text-lg text-gray-600">
              یہ صفحہ ابھی زیر تعمیر ہے۔ ان شاء اللہ جلد مکمل تفصیلات یہاں فراہم
              کی جائیں گی۔
            </p>
          </div>
        </div>

        <div className="lg:pr-2 p-4 lg:p-0 lg:col-span-2">
          <TaarufSidebarMenu />
        </div>
      </div>
    </div>
  );
}
