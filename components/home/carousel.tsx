"use client";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface Images {
  _id: string;
  imageUrl: string;
}

export default function HomeCarousel() {
  const [images, setImages] = useState<Images[]>([]);

//   const [isLoaded, setIsLoaded] = useState(false);

// useEffect(() => {
//   const handleLoad = () => setIsLoaded(true);
//   if (document.readyState === "complete") {
//     setIsLoaded(true);
//     console.log("loaded");
    
//   } else {
//     window.addEventListener("load", handleLoad);
//     return () => window.removeEventListener("load", handleLoad);
//   }
// }, []);



  useEffect(() => {
    async function getImages() {
      try {
        const response = await axios.get("/slider/images");

        if (response.status === 200) {
          setImages(response.data);
        }
      } catch (error: any) {
        console.error("Failed to get banner images", error);
      }
    }
    getImages();
  }, []);

  return (
    <div className="w-full ">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="relative w-full ">
                <img
                  src={item.imageUrl}
                  alt={`Jamia Islamia Chaman`}
                  className="h-full w-full object-cover aspect-[30/10]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
