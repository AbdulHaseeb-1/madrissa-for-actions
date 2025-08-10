import { URL } from "@/lib/url";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="no-print bg-primary text-white font-urdu px-4 py-8 overflow-hidden "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-white pb-6">
        {/* Contact Info */}
        <div className="space-y-2 text-base ">
          <Image
            src="/images/logo.svg"
            alt="جامعہ کا لوگو"
            width={160}
            height={160}
            className="mb-4 h-24 -mr-6   w-auto"
          />
          <p>P.O Box, No 6 Chaman-86000</p>
          <p>Allama Town Bypass Road</p>
        </div>

        {/* Departments */}
        <div>
          <h3 className="border-b border-white mb-5 pb-1 text-xl">شعبہ جات</h3>
          <ul className="space-y-4 text-base">
            <li>
              <Link href={URL.PATH.USER_QUESTIONS} className="hover:underline">
                مسئلے پوچھیں
              </Link>
            </li>
            <li>
              <Link href={URL.PATH.NAMAZ_TIME} className="hover:underline">
                نماز کے اوقات
              </Link>
            </li>
            <li>
              <Link href={URL.PATH.CONTACT} className="hover:underline">
                رابطہ
              </Link>
            </li>
                 <li>
              <Link href={URL.PATH.COURSES} className="hover:underline">
      تعلیمی شعبہ جات
              </Link>
            </li>
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="border-b border-white mb-5 pb-1 text-xl">
            ویب سائٹ کا نقشہ
          </h3>
          <ul className="space-y-4 text-base">
            <li>
              <Link href={URL.PATH.HOME} className="hover:underline">
                سرورق
              </Link>
            </li>
            <li>
              <Link href={URL.PATH.TAARUF} className="hover:underline">
                تعارف جامعہ
              </Link>
            </li>
            <li>
              <Link href={URL.PATH.DARULIFTA} className="hover:underline">
                دار الافتاء
              </Link>
            </li>
            <li>
              <Link href={URL.PATH.BAYANAT} className="hover:underline">
    بانی جامعہ 
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-base pt-4 px-2 leading-relaxed">
        جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن
      </div>
    </footer>
  );
}
