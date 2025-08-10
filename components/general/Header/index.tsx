"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import moment from "moment-hijri";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dates, setDates] = useState({
    islamic: "",
    gregorian: "",
  });

  useEffect(() => {
    const today = moment();

    const islamic = today.clone().locale("ar-SA").format("iD iMMMM iYYYY [هـ]");

    const gregorian = today.locale("ur").format("DD MMMM YYYY [ء]");

    setDates({
      islamic,
      gregorian,
    });
  }, []);

  return (
    <header className="no-print w-full bg-primary sticky top-0 z-50 shadow-md">
      <div className="px-4 max-w-[1920px] w-full mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-[90px] gap-6">
          <div className="flex items-center gap-4 lg:gap-6 text-white flex-1">
            <span
              className="text-xl lg:text-xl whitespace-nowrap flex gap-2 mt-2"
              style={{ letterSpacing: "2px" }}
              dir="rtl"
            >
              <div dir="">{dates.islamic}</div>|
              <div dir="">{dates.gregorian}</div>
            </span>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 justify-end-safe flex-grow-1">
            <div className="flex justify-center w-full">
              <NavigationMenu />
            </div>
            <Link href={"/"}>
              <Image
                src="/images/logo.svg"
                alt="Logo or Banner"
                width={235}
                height={58}
                className="object-cover w-auto h-10  lg:h-[70px]"
                priority
              />
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-[70px]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Logo or Banner"
              width={160}
              height={40}
              className="object-cover h-[60px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary border-t border-white/20 py-4 px-3 animate-in slide-in-from-top">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center gap-4 lg:gap-6 text-white flex-1">
                <span
                  className="text-lg  whitespace-nowrap flex gap-2  py-5"
                  style={{ letterSpacing: "2px" }}
                  dir="rtl"
                >
                  <div>{dates.islamic}</div>|<div>{dates.gregorian}</div>
                </span>
              </div>
              <div className="mt-2 ">
                <NavigationMenu mobile={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
