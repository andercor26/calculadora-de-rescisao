import type { Metadata } from "next";

export const SITE_NAME = "Calculadora do Trabalhador";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://calculadora-de-rescisao.vercel.app";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

interface Pergunta {
  pergunta: string;
  resposta: string;
}

export function faqSchema(perguntas: Pergunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.resposta,
      },
    })),
  };
}

export function webApplicationSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };
}
