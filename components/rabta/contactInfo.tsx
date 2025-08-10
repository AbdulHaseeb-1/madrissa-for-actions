import Link from "next/link";
import React from "react";

const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      id: 1,
      label: "نام",
      value: "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن",
    },
    {
      id: 2,
      label: "فون",
      value: "0312-2423839",
    },
    {
      id: 3,
      label: "فون",
      value: "0319-1368155",
    },
    {
      id: 4,
      label: "ای میل",
      value: "jamiaallamatown@gmail.com",
      isEmail: true,
    },

    // {
    //   id: 7,
    //   label: "چٹھی",
    //   value: "جمعة",
    // },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-md shadow border ">
      <table className=" text-right border-collapse w-full">
        <thead>
          <tr>
            <th className=" bg-gray-100 p-4  text-gray-700  border border-gray-200 text-right text-xl font-light">
              معلومات
            </th>
            <th className=" bg-gray-100 p-3 text-gray-700 font-semibold border border-gray-200 text-right">
              {/* Empty on purpose, to match style */}
            </th>
          </tr>
        </thead>
        <tbody className="text-lg font-light">
          {contactDetails.map((detail) => (
            <tr key={detail.id} className="border border-gray-200">
              <td className="px-4 py-3   border border-gray-200 font-medium text-gray-700">
                {detail.label}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {detail.isEmail ? (
                  <Link
                    href={`mailto:${detail.value}`}
                    className="text-blue-600 underline"
                  >
                    {detail.value}
                  </Link>
                ) : (
                  <span>{detail.value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInfo;
