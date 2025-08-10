"use client";
import React, { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const MapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // This function would typically initialize a map library
  // For this example, we're just showing a static map image
  useEffect(() => {
    if (!mapContainerRef.current) return;
    // In a real implementation, you would initialize your map here
    // e.g., const map = new mapLibrary.Map(mapContainerRef.current, {...});
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className=" bg-teal-700 text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2 p-4">
            <MapPin className="mr-2" size={20} />
            <span className="text-2xl font-light">ہمارا مقام </span>
          </h2>
        </div>

        <div ref={mapContainerRef} className="h-64 md:h-64 w-full relative">
          {/* Static map image as placeholder */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3422.968099747904!2d66.47534709999998!3d30.915515799999994!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed47975aeda3157%3A0x8bac352df6f301ba!2z2KfZhNis2KfZhdi524Mg2KfZhNin2LPZhNin2YXbjNuBINi52YTYp9mF24Eg2LnYqNiv2KfZhNi62YbbjCDZudin2YjZhiDYqNin2KbbjCDZvtin2LMg2LHZiNqIINqG2YXZhg!5e0!3m2!1sen!2s!4v1748583768097!5m2!1sen!2s"
            height="450"
            className="w-full border"
            loading="lazy"
          />
        </div>
      </div>
      <div className="pb-4" dir="rtl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-3 md:mb-0">
            {/* <h3 className="text-lg font-medium text-teal-800">
              جامعة العلوم الإمام
            </h3> */}
            <p className="text-gray-600 text-2xl">
              {" "}
           جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن
            </p>
          </div>
          {/* <div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors duration-200">
              الحصول على الاتجاهات
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
