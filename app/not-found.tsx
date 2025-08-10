import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
        صفحہ نہیں ملا | 404{" "}
      </h1>
      <p className="text-gray-700 text-center max-w-md text-xs md:text-base">
        معذرت! آپ جس صفحے کو تلاش کر رہے ہیں وہ موجود نہیں ہے یا ہٹا دیا گیا ہے۔
      </p>
    </div>
  );
}
