// app/darulifta/page.tsx
import { URL } from "@/lib/url";
import { redirect } from "next/navigation";

export default function DaruliftaRedirectPage() {
  redirect(URL.PATH.DARULIFTA);
}
