import type { Metadata } from "next";
import { CalculadoraFerias } from "@/components/calc/CalculadoraFerias";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Férias CLT";
const DESCRICAO =
  "Calcule o valor das suas férias com o terço constitucional, incluindo venda de férias (abono pecuniário) e adiantamento do 13º salário.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/ferias",
});

const PERGUNTAS = [
  {
    pergunta: "O que é a venda de férias?",
    resposta:
      "É a possibilidade de vender até 1/3 (10 dias) das suas férias para a empresa (também chamada de abono pecuniário), recebendo em dinheiro em vez de folga. É uma escolha sua. A empresa não pode obrigar nem recusar, se solicitado no prazo.",
  },
  {
    pergunta: "Como calcular férias CLT?",
    resposta:
      "O cálculo básico é salário dividido por 30, multiplicado pelos dias de férias, mais um terço constitucional sobre esse valor. Quem vende parte das férias recebe o mesmo cálculo sobre os dias vendidos.",
  },
  {
    pergunta: "Posso adiantar o 13º salário nas férias?",
    resposta:
      "Sim, se você solicitar até janeiro do ano correspondente, a empresa pode pagar a 1ª parcela do 13º (metade do salário) junto com as férias.",
  },
  {
    pergunta: "As férias têm desconto de INSS e IRRF?",
    resposta:
      "Sim, sobre o valor das férias (mas não sobre o terço constitucional, que é isento de INSS). Esta calculadora mostra o valor bruto. Para o líquido, use também a calculadora de salário líquido.",
  },
];

export default function FeriasPage() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/ferias" })} />
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Férias"
          titulo="Quanto você recebe nas suas férias?"
          descricao="Informe seu salário e quantos dias vai tirar (ou vender) para ver o valor com o terço constitucional."
        />
        <CalculadoraFerias />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre férias" />
        <OutrasCalculadoras atual="/ferias" />
      </main>
      <SiteFooter />
    </>
  );
}
