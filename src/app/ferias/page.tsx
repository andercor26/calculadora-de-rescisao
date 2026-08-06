import type { Metadata } from "next";
import { CalculadoraFerias } from "@/components/calc/CalculadoraFerias";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Calculadora de Férias — Calculadora do Trabalhador",
  description:
    "Calcule o valor das suas férias com o terço constitucional, incluindo abono pecuniário e adiantamento do 13º salário.",
};

const PERGUNTAS = [
  {
    pergunta: "O que é o abono pecuniário?",
    resposta:
      "É a possibilidade de vender até 1/3 (10 dias) das suas férias para a empresa, recebendo em dinheiro em vez de folga. É uma escolha sua — a empresa não pode obrigar nem recusar, se solicitado no prazo.",
  },
  {
    pergunta: "Posso adiantar o 13º salário nas férias?",
    resposta:
      "Sim, se você solicitar até janeiro do ano correspondente, a empresa pode pagar a 1ª parcela do 13º (metade do salário) junto com as férias.",
  },
  {
    pergunta: "As férias têm desconto de INSS e IRRF?",
    resposta:
      "Sim, sobre o valor das férias (mas não sobre o terço constitucional, que é isento de INSS). Esta calculadora mostra o valor bruto — para o líquido, use também a calculadora de salário líquido.",
  },
];

export default function FeriasPage() {
  return (
    <>
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
