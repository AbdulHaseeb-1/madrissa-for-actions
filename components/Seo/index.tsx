// components/Seo.tsx
import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const Seo = ({
  title = "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن",
  description = "Jamia Islamia Allama Abdul Ghani Town Chaman",
  image = "/favicon.ico",
  url = "https://jiallama.edu.pk",
}: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <link rel="canonical" href={url} />
  </Head>
);

export default Seo;
