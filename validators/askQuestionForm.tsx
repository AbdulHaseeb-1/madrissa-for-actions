import { z as zod } from "zod";

const askQuestionValidator = zod
  .object({
    name: zod.string().min(1, "نام درکار ہے۔"),
    email: zod
      .string()
      .email("ای میل درست نہیں ہے۔")
      .min(1, "ای میل درکار ہے۔"),
    contact: zod
      .string()
      .regex(/^\+?[0-9]\d{1,14}$/, " فون نمبر درست نہیں ہے۔")
      .optional(),
    message: zod.string().min(1, "پیغام درکار ہے۔"),
  })
  .refine((data) => data.email || data.contact, {
    message: "ای میل یا فون نمبر ضروری ہے۔",
    path: ["email"],
  });

export type askQuestionTypes = zod.infer<typeof askQuestionValidator>;
export default askQuestionValidator;
