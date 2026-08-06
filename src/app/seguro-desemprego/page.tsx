import type { Metadata } from "next";
import { CalculadoraSeguroDesemprego } from "@/components/calc/CalculadoraSeguroDesemprego";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Seguro-Desemprego 2026";
const DESCRICAO =
  "Simulador de seguro-desemprego 2026: veja quantas parcelas e qual o valor você tem direito a receber, de acordo com o número de solicitações e o tempo trabalhado.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/seguro-desemprego",
});

const PERGUNTAS = [
  {
    pergunta: "Quem tem direito ao seguro-desemprego?",
    resposta:
      "Em geral, trabalhadores dispensados sem justa causa (ou em rescisão indireta), que tenham cumprido o tempo mínimo trabalhado exigido. Pedido de demissão e demissão por justa causa não dão direito ao benefício.",
  },
  {
    pergunta: "Por que o tempo mínimo muda a cada solicitação?",
    resposta:
      "A lei exige mais tempo trabalhado quanto mais vezes a pessoa já solicitou o benefício: 12 meses na 1ª vez, 9 meses na 2ª, e 6 meses da 3ª em diante (sempre considerando os últimos 36 meses).",
  },
  {
    pergunta: "Como é calculado o valor da parcela?",
    resposta:
      "A partir da média dos seus últimos 3 salários, aplicando faixas progressivas definidas pelo CODEFAT: quem ganha menos recebe um percentual maior da média, e há um valor máximo (teto) para quem ganha mais.",
  },
  {
    pergunta: "Esse simulador de seguro-desemprego está atualizado para 2026?",
    resposta:
      "As regras de elegibilidade e número de parcelas seguem a legislação vigente. Já a tabela de valores das parcelas usa a referência de 2024, reajustada pelo governo todo ano, geralmente em fevereiro. Confirme o valor exato em gov.br/trabalho-e-emprego antes de tomar decisões.",
  },
];

export default function SeguroDesempregoPage() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/seguro-desemprego" })} />
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Seguro-desemprego"
          titulo="Quanto você tem direito a receber de seguro-desemprego?"
          descricao="Informe quantas vezes já solicitou o benefício, o tempo trabalhado e sua média salarial para ver uma estimativa de parcelas e valores."
        />
        <CalculadoraSeguroDesemprego />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre o seguro-desemprego" />
        <OutrasCalculadoras atual="/seguro-desemprego" />
      </main>
      <SiteFooter />
    </>
  );
}
