"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { toast } from "sonner";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const formatTo12Hour = (time24: string): string => {
  const [hoursStr, minutes] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

// Types for prayer timings
type TimingKeys = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

type TimingsResponse = {
  data: {
    timings: Record<TimingKeys, string>;
  };
};

type Prayer = {
  name: string;
  time: string;
};

export default function PrayerTimesSection() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          "https://www.islamicfinder.us/index.php/api/prayer_times?country=PK&zipcode=86000&method=1&juristic=1"
        );
        const data = response?.data;
        const timings = data?.results;

        const urduPrayers: Prayer[] = [
          { name: "فجر", time: timings?.Fajr.replaceAll("%", "") },
          { name: "ظہر", time: timings?.Dhuhr.replaceAll("%", "") },
          { name: "عصر", time: timings?.Asr.replaceAll("%", "") },
          { name: "مغرب", time: timings?.Maghrib.replaceAll("%", "") },
          { name: "عشاء", time: timings?.Isha.replaceAll("%", "") },
        ];

        setPrayers(urduPrayers);
      } catch (error) {
        toast.error("Error fetching prayer times");
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <section className="pt-0 pb-12 px-4" id="namaz-time">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-2xl md:text-4xl text-center mb-12 text-primary">
          نماز کے اوقات
        </h2>

        <div className="grid bg-gradient-to-br from-[#CB6565] to-[#A84545] mx-auto rounded-2xl shadow-lg overflow-hidden">
          <div className="rounded-lg relative min-h-[338px]">
            {/* Background decorative elements */}
            <div className="absolute right-0 bottom-0">
              <Image
                src="/images/home/prayers/mosque.svg"
                alt="Mosque silhouette"
                width={252}
                height={175}
                className="opacity-80 h-auto w-auto"
              />
            </div>
            <div className="absolute right-0 top-0">
              <Image
                src="/images/home/prayers/Sun.svg"
                alt="Sun"
                width={252}
                height={170}
                className="opacity-80 h-auto w-auto"
              />
            </div>

            {/* Prayer times grid */}
            <div className="xl:max-w-[80%] grid grid-cols-2 lg:grid-cols-5 gap-4 h-full px-4 py-6 md:p-8 text-white relative z-10">
              {process &&
                prayers?.map((prayer, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center md:items-start rounded-lg p-4 transition-colors"
                  >
                    <div className="font-arabic text-3xl md:text-5xl mb-2">
                      {prayer?.name}
                    </div>
                    <div
                      className={`font-bold ${geistSans.className} uppercase text-2xl md:text-3xl text-nowrap`}
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      {prayer?.time}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
