// utils/seo.ts

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export function generateMetadata({
  title = "جامعہ اسلامیہ علامہ عبدالغنی ٹاؤن چمن",
  description = "Jamia Islamia Allama Abdul Ghani Town Chaman",
  url = "https://jiallama.edu.pk",
  image = "/favicon.ico",
}: GenerateMetadataProps) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(url),
  };
}
