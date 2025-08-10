"use client"
import React, { useEffect, useState } from "react";
import { Menu, ChevronRight, ListCheck } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import he from "he";

type Taaruf = {
  _id: string;
  title: string;
  subTitle: string;
  slug: string;
};

const TaarufSidebarMenu = () => {
  const [taaruf, setTaaruf] = useState<Taaruf[]>([]);
  const path = usePathname();

  useEffect(() => {
    const getTaarufs = async () => {
      try {
        const response = await axios.get("/taaruf");
        setTaaruf(response.data.taarufs || []);
      } catch (err) {
        // toast.error("Failed to load Taarufs.");
      }
    };

    getTaarufs();
  }, []);

  return (
    <div className="   shadow-lg " dir="rtl">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex gap-2 items-center ">
          <ListCheck />
          <h2 style={{ margin: 0 }} className="text-lg pt-3" dir="rtl">
            معلوماتی لنکس
          </h2>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-2 py-1 ">
        {taaruf.map((item, index) => (
          <Link href={`/pages/${item.slug}`} key={index}>
            <div
              className={clsx(
                `border-b group hover:bg-primary text-black hover:text-white rounded-md transition-colors duration-200 cursor-pointer`,
                path.split("/")[2] == item.slug && "bg-primary/90 text-white"
              )}
            >
              <div className="flex items-center justify-between p-3 border-b border-amber-200 last:border-b-0">
                <span
                  className=" text-base pt-2 leading-relaxed flex-1 text-right pr-2"
                  dir="rtl"
                  style={{ lineHeight: "1.8" }}
                >
                  {he.decode(item.title)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaarufSidebarMenu;
