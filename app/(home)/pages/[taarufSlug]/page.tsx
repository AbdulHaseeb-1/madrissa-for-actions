// app/(taaruf)/taaruf/details/[taarufSlug]/page.tsx
import SectionBanner from "@/components/general/sectionBanner";
import axios from "@/lib/axios";
import he from "he";
import TaarufSidebarMenu from "@/components/taaruf/taarufSideBar";
import Error from "@/components/general/error";
// import Loading from "@/app/loading";
import { Metadata } from "next";
import { metadata as siteMetaData } from "@/lib/constants";
import TaarufDetailsPlaceholder from "./placeholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ taarufSlug: string }>;
}): Promise<Metadata> {
  try {
    const { taarufSlug } = await params;
    const response = await axios.get(`/taaruf/details/${taarufSlug}`);
    const data = response.data.data;

    return {
      title: data?.title || "تعارف جامعہ",
      description: he.decode(
        data?.details?.slice(0, 300) || "تفصیلات دستیاب نہیں۔"
      ),
      metadataBase: new URL("https://jiallama.edu.pk"),
      alternates: {
        canonical: "https://jiallama.edu.pk/pages/jamia-islamia",
      },
      openGraph: {
        title: data?.title || "تعارف جامعہ",
        description: he.decode(
          data?.details?.slice(0, 200) || "تفصیلات دستیاب نہیں۔"
        ),
        url: `${siteMetaData.openGraph.url}/pages/${encodeURIComponent(
          taarufSlug
        )}`,
        images: siteMetaData.openGraph.images, // Optional: Replace with dynamic OG image
        siteName: "Jamia Islamia Chaman",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (err) {
    return {
      title: "تعارف کی تفصیل",
      description:
        "یہ صفحہ فی الحال دستیاب نہیں ہے۔ براہ کرم بعد میں دوبارہ ملاحظہ کریں۔",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function TaarufDetails({
  params,
}: {
  params: Promise<{ taarufSlug: string }>;
}) {
  try {
    const { taarufSlug } = await params;
    const response = await axios.get(`/taaruf/details/${taarufSlug}`);
    const taarufDetails = response.data.data;

    return (
      <div className="text-right max-w-[1920px] mx-auto space-y-10 relative overflow-hidden mb-10">
        <SectionBanner title={taarufDetails.title} />
        <div className="flex flex-col lg:grid lg:grid-cols-14 gap-2 lg:mr-5">
          <div className="pl-4 md:pl-5 pr-4 col-span-11 mx-2 md:mx-5">
            <div className="print-content py-2 mb-4">
              <h1 className="text-primary text-xl md:text-2xl lg:text-3xl leading-relaxed">
                {taarufDetails.title}
              </h1>
              <br />
              <hr />
            </div>

            <div className="mb-6 print-content" dir="rtl">
              <div
                className="content text-neutral-800 text-xl md:text-2xl lg:text-3xl leading-loose text-right"
                dangerouslySetInnerHTML={{
                  __html: he.decode(
                    taarufDetails.details || "مزید معلومات دستیاب نہیں۔"
                  ),
                }}
              />
            </div>
          </div>

          <div className="lg:pr-2 p-4 lg:p-0 lg:col-span-3 ">
            <TaarufSidebarMenu />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return <TaarufDetailsPlaceholder />;
  }
}
