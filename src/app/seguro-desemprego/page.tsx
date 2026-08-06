import type { Metadata } from "next";
import { CalculadoraSeguroDesemprego } from "@/components/calc/CalculadoraSeguroDesemprego";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego — Calculadora do Trabalhador",
  description:
    "Simule quantas parcelas e qual o valor do seu seguro-desemprego, de acordo com o número de solicitações e o tempo trabalhado.",
};

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
    pergunta: "Os valores desta calculadora estão atualizados?",
    resposta:
      "Usamos a tabela de referência de 2024. O governo reajusta os valores todo ano, geralmente em fevereiro — confirme o valor exato em gov.br/trabalho-e-emprego antes de tomar decisões.",
  },
];

export default function SeguroDesempregoPage() {
  return (
    <>
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
