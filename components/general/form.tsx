"use client";
import React, { useEffect, useState } from "react";
import askQuestionValidator, {
  askQuestionTypes,
} from "@/validators/askQuestionForm";
import { ZodError } from "zod";
import clsx from "clsx";
import axios from "@/lib/axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";

// TYPES
type Errors = Array<{
  path: keyof askQuestionTypes | "server";
  message: string;
}>;

// * COMPONENT
export default function QuestionForm() {
  // StateS
  const [formData, setFormData] = useState<askQuestionTypes>({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Errors>([]);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError((prev) => prev.filter((err) => err.path !== name));
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // console.log("Form Data:", formData);
      // ? Validating FormData
      askQuestionValidator.parse(formData);

      let response = await axios.post("user-questions/add", formData);
      console.log(response.data);
      if (response.status === 201) {
        // // ? Resetting Form
        setFormData({
          name: "",
          email: "",
          contact: "",
          message: "",
        });
        toast.success("آپ کا سوال کامیابی سے بھیج دیا گیا ہے۔");
        setLoading(false);
        setError([]);
        return;
      }
      throw new Error(" آپ کا سوال کامیابی سے بھیج دیا گیا ہے۔");
    } catch (error: any) {
      if (error instanceof ZodError) {
        // ? Handling ZodError
        const issues = error.issues.map((issue) => {
          return {
            path: issue.path[0] as keyof askQuestionTypes,
            message: issue.message,
          };
        });
        setError(issues);
        // Add your form submission logic here (e.g., API call)
      } else {
        toast.error("کچھ غلط ہو گیا، کچھ دیر بعد دوبارہ کوشش کریں۔")
        setError((prev) => [
          ...prev,
          { path: "server", message: error.message },
        ]);
      }
    }
  };

  return (
    <div>
      <h2 className=" p-2 text-xl text-primary ">سوال پوچھیں</h2>
      <div className=" mx-auto p-5 border border-primary rounded-lg  shadow-xl  dir-rtl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-right block text-primary text-base mb-2"
            >
              مکمل نام
            </label>
            <input
              dir="rtl"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مکمل نام"
              className={clsx(
                "border rounded w-full p-2 text-base bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner",
                error.find((e) => e.path === "name")
                  ? "border-red-500"
                  : "border-neutral-300"
              )}
            />
            {error.find((e) => e.path === "name") && (
              <p className="text-red-500 px-1 pt-2">
                {error.find((e) => e.path === "name")?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-right block text-primary text-base mb-2"
            >
              ای میل ایڈریس
            </label>
            <input
              dir="rtl"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ای میل ایڈریس"
              className={clsx(
                "border rounded w-full p-2 text-base bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner",
                error.find((e) => e.path === "email")
                  ? "border-red-500"
                  : "border-neutral-300"
              )}
            />
            {error.find((e) => e.path === "email") && (
              <p className="text-red-500 px-1 pt-2">
                {error.find((e) => e.path === "email")?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="text-right block text-primary text-base mb-2"
            >
              رابطہ نمبر
            </label>
            <input
              dir="rtl"
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="رابطہ نمبر"
              className={clsx(
                "border rounded w-full p-2 text-base bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner",
                error.find((e) => e.path === "contact")
                  ? "border-red-500"
                  : "border-neutral-300"
              )}
            />
            {error.find((e) => e.path === "contact") && (
              <p className="text-red-500 px-1 pt-2">
                {error.find((e) => e.path === "contact")?.message}
              </p>
            )}
          </div>

          {/* ==================================== */}

          <div className="mb-4">
            <label
              htmlFor="message"
              className="text-right block text-primary text-base mb-2"
            >
              پیام
            </label>
            <textarea
              dir="rtl"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="پیام"
              rows={4}
              className={clsx(
                "border rounded w-full p-2 text-base bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner",
                error.find((e) => e.path === "message")
                  ? "border-red-500"
                  : "border-neutral-300"
              )}
            />
            {error.find((e) => e.path === "message") && (
              <p className="text-red-500 px-1 pt-2">
                {error.find((e) => e.path === "message")?.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="flex gap-2   justify-center items-center  w-full pt-3 pb-1 bg-primary text-white rounded text-base hover:bg-teal-600 transition"
          >
            {loading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              " ارسال کریں"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
