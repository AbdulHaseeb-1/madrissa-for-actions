"use client";

import {
  AlertCircle,
  Home,
  RefreshCw,
  ArrowLeft,
  StepBack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Error() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-none border-0  backdrop-blur-sm">
        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-200 to-pink-200 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500 animate-bounce" />
            </div>
          </div>
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-50 animation-delay-300"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            خرابی ہوئی ہے
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            کچھ غلط ہو گیا ہے... برائے کرم دوبارہ کوشش کریں
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-red-300 to-pink-300 mx-auto rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mx-auto">
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant={"ghost"}
              size={"icon"}
              className=" font-medium py-2.5 rounded-lg transition-all duration-300  hover:scale-105 s"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4  animate-spin" />
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 " />
                </>
              )}
            </Button>
            <Button
              onClick={handleGoBack}
              variant="ghost"
              size={"icon"}
              className=" border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 " />
            </Button>

            <Button
              onClick={handleGoHome}
              variant="ghost"
              size={"icon"}
              className=" border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <Home className="w-4 h-4 " />
            </Button>
          </div>
        </div>
      </Card>

      {/* Background Decorative Elements */}
    </div>
  );
}
