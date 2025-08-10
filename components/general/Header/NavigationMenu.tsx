"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { URL } from "@/lib/url";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuPortal,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";

export default function NavigationMenu({ mobile = false, setMobileMenu }: any) {
  const [categoryies, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await axios.get("/bayanCategories");
      if (response.status === 200) {
        setCategories(response.data);
      }
    }
    getCategories();
  }, []);

  const menuItems = [
    { title: "سرورق", path: URL.PATH.HOME },
    { title: "دارالافتاء", path: URL.PATH.DARULIFTA },
    { title: "بانی جامعہ", path: URL.PATH.BAYANAT },
    { title: "تعارف  جامعہ", path: URL.PATH.TAARUF },
    { title: " تعلیمی شعبہ جات", path: URL.PATH.COURSES },
    { title: "رابطہ", path: URL.PATH.CONTACT },
    { title: "سوال پوچھیں", path: URL.PATH.USER_QUESTIONS },
  ];

  // Mobile version
  if (mobile) {
    return (
      <div className="w-full ">
        <ul className="flex flex-col space-y-3 -mr-6">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="text-white w-full flex justify-end list-none"
            >
              <Link
                href={item.path}
                onClick={() => {
                  setMobileMenu(false);
                }}
                className="flex justify-end w-full  py-1 border-b px-3 text-base rounded bg-primary-dark hover:bg-primary-dark/80 transition-colors text-right"
              >
                {item.title}
              </Link>
            </li>
          ))}

          {/* Dropdown for mobile */}
          {/* <li className="text-white w-full" style={{ listStyle: "none" }}>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex justify-between items-center px-3 py-2 bg-primary-dark hover:bg-primary-dark/80 text-lg rounded">
                بینات <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-primary text-white w-full rtl p-0"
                side="bottom"
                align="end"
              >
                {categoryies.map((category: any, index: number) =>
                  category.subcategories?.length > 0 ? (
                    <DropdownMenuSub key={index}>
                      <DropdownMenuSubTrigger
                        dir="rtl"
                        className="text-lg border-b justify-between w-full px-3 py-2 hover:bg-primary/80 flex items-center"
                      > */}
          {/* <span>{category.name}</span> */}
          {/* Add a small clickable area to navigate */}
          {/* <Link
                          href={`/bayanat/${category.slug}`}
                          onClick={(e) => e.stopPropagation()} // prevent submenu closing
                          className="ml-2 underline text-sm text-white hover:text-gray-300"
                        >
                          دیکھیں
                        </Link>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-primary text-white w-56 p-0">
                          {category.subcategories.map(
                            (sub: any, index: number) => (
                              <Link key={index} href={`/bayanat/${sub.slug}`}>
                                <DropdownMenuItem
                                  dir="rtl"
                                  className="text-base border-b px-3 py-2 hover:bg-primary/70"
                                >
                                  {sub.name}
                                </DropdownMenuItem>
                              </Link>
                            )
                          )}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ) : (
                    <Link key={category._id} href={`/bayanat/${category.slug}`}>
                      <DropdownMenuItem
                        dir="rtl"
                        className="text-lg border-b px-3 py-2 hover:bg-primary/70"
                      >
                        {category.name}
                      </DropdownMenuItem>
                    </Link>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li> */}
        </ul>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="hidden xl:block items-center" dir="rtl">
      <ul className="flex gap-10 items-center justify-center w-full list-none mt-2">
        {menuItems.map((item, index) => (
          <li className="text-white list-none" key={index}>
            <Link href={item.path} className="text-xl">
              {item.title}
            </Link>
          </li>
        ))}
        {/* <li className="text-white" style={{ listStyle: "none" }}>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-2xl flex gap-1 items-center">
              بینات <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-primary text-white w-56 p-0 rtl"
              align="end"
            >
              {categoryies.map((category: any, index: number) =>
                category.subcategories?.length > 0 ? (
                  <DropdownMenuSub key={index}>
                    <Link href={`/bayanat/${category.slug}`}>
                      <DropdownMenuSubTrigger
                        dir="rtl"
                        className="text-lg border-b justify-between w-full px-3 py-2 hover:bg-primary/80"
                      >
                        {category.name}
                      </DropdownMenuSubTrigger>
                    </Link>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-primary text-white w-56 p-0">
                        {category.subcategories.map((sub: any, i: number) => (
                          <Link key={i} href={`/bayanat/${sub.slug}`}>
                            <DropdownMenuItem
                              dir="rtl"
                              className="text-lg border-b px-3 py-2 hover:bg-primary/70"
                            >
                              {sub.name}
                            </DropdownMenuItem>
                          </Link>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <Link key={category._id} href={`/bayanat/${category.slug}`}>
                    <DropdownMenuItem
                      dir="rtl"
                      className="text-xl border-b px-3 py-2 hover:bg-primary/70"
                    >
                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li> */}
      </ul>
    </div>
  );
}
