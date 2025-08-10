import { Loader2, BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className=" min-h-screen  flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo/Icon Section */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          {/* Decorative stars */}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            المدرسہ
          </h1>
          <p className="text-primary font-medium text-lg">
            جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن
          </p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin duration-1000" />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
