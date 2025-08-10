"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { URL } from "@/lib/url";
import localFont from "next/font/local";


const arabic = localFont({
  src: "../..//fonts/arabic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-arabic", // Optional: Generate a CSS variable
});


export default function FilterBox() {
  const [categories, setCategories] = useState<
    { _id: string; name: string; slug: string; subcategories: [] }[]
  >([]);
  const [subcategories, setSubcategories] = useState<
    { _id: string; name: string; slug: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [fatwaNumber, setFatwaNumber] = useState("");

  // Fetch all categories
  useEffect(() => {
    axios
      .get("/questionCategories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    const selected = categories.find((cat) => cat.slug === selectedCategory);
    setSubcategories(selected?.subcategories || []);
  }, [selectedCategory, categories]);

  const handleSearch = () => {
    // If fatwa number is provided, search by fatwa number
    if (fatwaNumber.trim()) {
      return `${URL.PATH.DARULIFTA_BASE}/${fatwaNumber.trim()}`;
    }
    // Otherwise, search by category/subcategory
    return `${URL.PATH.DARULIFTA_BASE}/${selectedSubcategory || selectedCategory}`;
  };

  const isSearchDisabled = !fatwaNumber.trim() && !selectedCategory;

  return (
    <section className="flex justify-center items-center py-6 md:py-8">
    
      <div
        className="relative bg-[url('/images/pattern.webp')] bg-cover text-black md:rounded-3xl p-6 w-full max-w-2xl lg:max-w-2xl"
        dir="rtl"
      > 
        
        <div className="flex flex-col gap-4">
          
          {/* Fatwa Number Input */}
          <div className="w-full">
            <Input
              type="text"
              placeholder="عنوان یا فتوی نمبر درج کریں۔"  
              value={fatwaNumber}
              onChange={(e) => setFatwaNumber(e.target.value)}
              className="bg-neutral-200  w-full rounded-full px-4 py-5 text-righ placeholder:text-xs"
              dir="rtl"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="text-white/70 text-sm">یا</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-1 w-full gap-4">
            {/* Category Select */}
            <Select
              dir="rtl"
              onValueChange={(value) => setSelectedCategory(value)}
              disabled={!!fatwaNumber.trim()}
            >
              <SelectTrigger
                style={{
                  paddingBlock: "0px",
                  paddingTop: "13px",
                  paddingBottom: "10px",
                }}
                className="bg-white border text-sm  leading-10   border-gray-300 text-black w-full rounded-full px-4 py-5 text-right shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <SelectValue placeholder="زمرہ منتخب کریں" />
              </SelectTrigger>
              <SelectContent className={`${arabic.className}`}>
                <SelectItem value={"all"}>{"تمام"}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Subcategory Select */}
            <Select
              dir="rtl"
              onValueChange={setSelectedSubcategory}
              disabled={!subcategories.length || !!fatwaNumber.trim()}
            >
              <SelectTrigger
                style={{
                  paddingBlock: "0px",
                  paddingTop: "13px",
                  paddingBottom: "10px",
                }}
                className="bg-neutral-200  leading-12   text-black w-full rounded-full px-4 py-5 text-right"
              >
                <SelectValue placeholder="ذیلی زمرہ منتخب کریں" />
              </SelectTrigger>
                   <SelectContent className={`${arabic.className}`}>
                {subcategories.map((sub, i) => (
                  <SelectItem key={i} value={sub.slug}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-4">
            <Link href={handleSearch()}>
              <Button
                className="bg-primary hover:bg-teal-700 text-white rounded-full px-6 py-2"
                disabled={isSearchDisabled}
              >
                تلاش کریں
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
