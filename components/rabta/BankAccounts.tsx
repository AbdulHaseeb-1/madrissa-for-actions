import Image from "next/image";
import React from "react";

interface BankAccount {
  id: number;
  bankName: string;
  logoUrl: string;
  details: {
    title: string;
    accountNo: string;
    iban: string;
    branchName: string;
    branchCode: string;
    swiftCode: string;
  };
}

const BankAccounts: React.FC = () => {
  const bankAccounts: BankAccount[] = [
    {
      id: 1,
      bankName: "Allied Bank",
      logoUrl: "/images/allied-bank-limited-logo.png",
      details: {
        title: "JAMIAT UL ULOOM AL-IMAM",
        accountNo: "0010008662563001",
        iban: "PK96 ABPA 0010 0086 6256 3001",
        branchName: "Allied Bank Ltd - North Town Branch",
        branchCode: "0188",
        swiftCode: "ABPAPKKA",
      },
    },
    {
      id: 2,
      bankName: "Faysal Bank",
      logoUrl: "/images/faysal-bank-icon-logo.png",
      details: {
        title: "JAMIAT UL ULOOM AL-IMAM",
        accountNo: "3016990000001661",
        iban: "PK36 FAYS 0301 6990 0000 0166",
        branchName: "Faysal Bank Ltd - North Town Branch",
        branchCode: "3011",
        swiftCode: "FAYSPKKA",
      },
    },
    {
      id: 3,
      bankName: "Meezan Bank",
      logoUrl: "/images/meezan-bank-logo.png",
      details: {
        title: "JAMIAT UL ULOOM AL-IMAM",
        accountNo: "9876543210987",
        iban: "PK36 MEZN 0018 7991 0078 1987",
        branchName: "Meezan Bank Ltd - North Town Branch",
        branchCode: "0187",
        swiftCode: "MEZNPKKA",
      },
    },
  ];

  return (
    <div className="mb-8 space-y-6">
      {bankAccounts.map((bank) => (
        <div
          key={bank.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center jus">
            <div className="w-16 h-16 bg-white p-2 rounded-md flex items-center justify-center mr-4">
              <Image
                width={80}
                height={80}
                src={bank.logoUrl}
                alt={`${bank.bankName} logo`}
                className=" object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {bank.bankName}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody>
                {Object.entries(bank.details).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                      {key === "title" && "Title"}
                      {key === "accountNo" && "Account No"}
                      {key === "iban" && "IBAN"}
                      {key === "branchName" && "Branch Name"}
                      {key === "branchCode" && "Branch Code"}
                      {key === "swiftCode" && "Swift Code"}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-teal-50 border-t border-teal-200 flex justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              نسخ معلومات الحساب / Copy Account Information
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankAccounts;
