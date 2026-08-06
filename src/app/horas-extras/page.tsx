import type { Metadata } from "next";
import { CalculadoraHorasExtras } from "@/components/calc/CalculadoraHorasExtras";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Calculadora de Horas Extras — Calculadora do Trabalhador",
  description:
    "Calcule o valor das horas extras com adicional de 50% e 100%, incluindo o reflexo no DSR (descanso semanal remunerado).",
};

const PERGUNTAS = [
  {
    pergunta: "Qual é o adicional mínimo para horas extras?",
    resposta:
      "A Constituição garante no mínimo 50% sobre o valor da hora normal para horas extras em dias úteis. Domingos e feriados trabalhados costumam ter adicional de 100%, salvo compensação em banco de horas.",
  },
  {
    pergunta: "O que é o reflexo no DSR?",
    resposta:
      "Quem recebe horas extras habitualmente também tem direito a receber esse valor refletido no descanso semanal remunerado (folgas, domingos e feriados), proporcionalmente aos dias úteis do mês.",
  },
  {
    pergunta: "220h é sempre a jornada mensal certa?",
    resposta:
      "220h é o padrão para jornada de 44h semanais (a mais comum), mas sua convenção coletiva ou contrato pode prever jornada diferente — ajuste o campo se for o seu caso.",
  },
];

export default function HorasExtrasPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Horas extras"
          titulo="Quanto você tem a receber de horas extras?"
          descricao="Informe seu salário, a jornada mensal e as horas extras trabalhadas para ver o valor devido, com e sem reflexo no DSR."
        />
        <CalculadoraHorasExtras />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre horas extras" />
        <OutrasCalculadoras atual="/horas-extras" />
      </main>
      <SiteFooter />
    </>
  );
}
