import type { Metadata } from "next";
import { CalculadoraRescisaoDomestica } from "@/components/calc/CalculadoraRescisaoDomestica";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Rescisão Empregada Doméstica";
const DESCRICAO =
  "Calculadora de rescisão trabalhista para empregada doméstica, conforme a LC 150/2015, com FGTS e indenização compensatória de 3,2%.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/rescisao-domestica",
});

const PERGUNTAS = [
  {
    pergunta: "O que muda em relação à rescisão de um empregado CLT comum?",
    resposta:
      "As regras de aviso prévio, 13º e férias são as mesmas. A principal diferença está no FGTS: além dos 8% mensais, o empregador deposita 3,2% ao mês em um fundo à parte, que substitui a multa de 40% e só é pago à trabalhadora em caso de dispensa sem justa causa.",
  },
  {
    pergunta: "E se eu pedir demissão ou for demitida por justa causa?",
    resposta:
      "Nesses casos o fundo de indenização compensatória (3,2%) volta para o empregador, e não é pago à trabalhadora. Assim como a multa de 40% também não seria devida em um contrato CLT comum.",
  },
  {
    pergunta: "Empregada doméstica tem direito a seguro-desemprego?",
    resposta:
      "Sim, em caso de dispensa sem justa causa, com pelo menos 15 dos últimos 24 meses trabalhados: são até 3 parcelas de 1 salário mínimo cada, um valor fixo, diferente da tabela usada para empregados CLT em geral.",
  },
];

export default function RescisaoDomesticaPage() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd
        data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/rescisao-domestica" })}
      />
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Rescisão doméstica"
          titulo="Rescisão de empregada doméstica, conforme a LC 150/2015"
          descricao="Preencha os dados do contrato para estimar as verbas rescisórias, incluindo o FGTS e a indenização compensatória de 3,2%."
        />
        <CalculadoraRescisaoDomestica />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre rescisão doméstica" />
        <OutrasCalculadoras atual="/rescisao-domestica" />
      </main>
      <SiteFooter />
    </>
  );
}
