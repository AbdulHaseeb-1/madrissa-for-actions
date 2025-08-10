import CourseDetails from "@/components/course/courseDetails";
import axios from "@/lib/axios";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { metadata as siteMetadata } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  try {
    let { courseSlug } = await params;
    const res = await axios.get(`/courses/details/${courseSlug}`);
    const data = res.data;

    return {
      title: data.title,
      description: data?.tafseel.slice(0, 150) || siteMetadata.description,
      metadataBase: new URL("https://jiallama.edu.pk"),
      alternates: {
        canonical: "https://jiallama.edu.pk/",
      },
      openGraph: {
        title: data.title,
        description: data?.tafseel.slice(0, 150) || siteMetadata.description,
        images: siteMetadata.openGraph.images,
        url: `/courses/${courseSlug}`,
        siteName: "Jamia Islamia Chaman",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (e) {
    return {
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function Courses({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  try {
    const res = await axios.get(`/courses/details/${courseSlug}`);
    const course = res.data;

    return (
      <div>
        <CourseDetails course={course} />
      </div>
    );
  } catch (error: any) {
    if (error.response?.status === 404) {
      return redirect("/not-found");
    }
    return (
      <div className="flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm max-w-md mx-auto mt-10">
        <AlertTriangle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-red-700">کچھ غلط ہو گیا ہے</h2>
        <p className="text-sm text-red-600 mt-2">
          کورسز کو لوڈ کرتے وقت مسئلہ پیش آیا۔ براہ کرم بعد میں کوشش کریں یا
          صفحہ کو ریفریش کریں۔
        </p>
      </div>
    );
  }
}
