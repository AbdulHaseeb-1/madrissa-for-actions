// app/darulifta/page.tsx
import { URL } from "@/lib/url";
import { permanentRedirect } from "next/navigation";

export default function DaruliftaRedirectPage() {
  permanentRedirect(URL.PATH.TAARUF);
}
