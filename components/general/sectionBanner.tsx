import React from "react";

export default function SectionBanner({ title }: { title?: string }) {
  return (
    <div className="relative">
      <div className="no-print relative bg-[url('/images/sectionBanner.jpg')]  bg-cover bg-center h-52 lg:h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 backdrop-blur-md " />
        <div className="relative z-10 flex items-center justify-end px-4 md:px-20 lg:px-52 xl:px-80 h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl  tracking-normal">
            {title ? title : ""}
          </h1>
        </div>
      </div>
       
    </div>
  );
}
