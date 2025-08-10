import { Loader, LoaderPinwheel } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex gap-4 w-full items-center justify-center py-20">
      <Loader size={30} className="animate-spin text-primary" />
      Loading
    </div>
  );
}
