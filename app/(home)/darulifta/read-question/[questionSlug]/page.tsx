// app/daralfata/[slug]/page.tsx
import axios from "@/lib/axios";
import FatwaDetail from "@/components/darulifta/fatwaDetails"; // client
import { metadata as siteMetadata } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ questionSlug: string }>;
}) {
  try {
    let { questionSlug } = await params;
    const res = await axios.get(`/questions/details/${questionSlug}`);
    const data = res.data;

    return {
      title: data.title || "فتویٰ",
      description: data?.answer.slice(0, 200) || siteMetadata.description,
      metadataBase: new URL("https://jiallama.edu.pk"),
      alternates: {
        canonical: "https://jiallama.edu.pk/",
      },
      openGraph: {
        title: data.title || "فتویٰ",
        description: data?.answer.slice(0, 200) || siteMetadata.description,
        images: siteMetadata.openGraph.images,
        url: `/darulifta/read-question/${questionSlug}`,
        siteName: "Jamia Islamia Chaman",
      },
    };
  } catch (e) {
    return {
      title: "فتویٰ",
      description: "تفصیلات دستیاب نہیں۔",
      metadataBase: new URL("https://jiallama.edu.pk"),
      alternates: {
        canonical: "https://jiallama.edu.pk/",
      },
    };
  }
}

export default async function FatwaDetailPage({
  params,
}: {
  params: Promise<{ questionSlug: string }>;
}) {
  try {
    let { questionSlug } = await params;
    const res = await axios.get(`/questions/details/${questionSlug}`);
    const data = res.data;

    return <FatwaDetail fatwaDetails={data} />;
  } catch (e) {
    return (
      <div className="text-center text-red-500 p-10">
        فتویٰ کی تفصیلات دستیاب نہیں۔
      </div>
    );
  }
}
