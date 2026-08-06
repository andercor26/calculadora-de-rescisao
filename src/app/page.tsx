import type { Metadata } from "next";
import { Calculadora } from "@/components/Calculadora";
import { Diferenciais } from "@/components/Diferenciais";
import { Faq, PERGUNTAS_PADRAO } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VerbasGrid } from "@/components/VerbasGrid";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Rescisão Trabalhista";
const DESCRICAO =
  "Calculadora de rescisão trabalhista online e grátis, com FGTS: saldo de salário, aviso prévio, 13º, férias e multa de 40%, considerando justa causa e carteira assinada.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS_PADRAO)} />
      <JsonLd data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/" })} />
      <SiteHeader />
      <main>
        <Hero />
        <Calculadora />
        <VerbasGrid />
        <Diferenciais />
        <Faq />
        <OutrasCalculadoras atual="/" />
      </main>
      <SiteFooter />
    </>
  );
}
