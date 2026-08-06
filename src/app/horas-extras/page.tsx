import type { Metadata } from "next";
import { CalculadoraHorasExtras } from "@/components/calc/CalculadoraHorasExtras";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Horas Extras com DSR";
const DESCRICAO =
  "Calculadora de horas extras online: calcule o valor com adicional de 50% e 100%, incluindo o reflexo no DSR (descanso semanal remunerado).";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/horas-extras",
});

const PERGUNTAS = [
  {
    pergunta: "Qual é o adicional mínimo para horas extras?",
    resposta:
      "A Constituição garante no mínimo 50% sobre o valor da hora normal para horas extras em dias úteis. Domingos e feriados trabalhados costumam ter adicional de 100%, salvo compensação em banco de horas.",
  },
  {
    pergunta: "Como calcular horas extras com minutos?",
    resposta:
      "Converta os minutos em fração de hora antes de preencher o campo: 15 minutos equivalem a 0,25h, 30 minutos a 0,5h e 45 minutos a 0,75h. Por exemplo, 1h20min de hora extra é 1,33h.",
  },
  {
    pergunta: "Horas extras noturnas têm um cálculo diferente?",
    resposta:
      "Sim. O trabalho noturno (22h às 5h) tem adicional próprio de pelo menos 20% e hora reduzida de 52 minutos e 30 segundos, que se soma ao adicional de horas extras. Esta calculadora não aplica o adicional noturno automaticamente, então some-o à parte se for o seu caso.",
  },
  {
    pergunta: "O que é o reflexo no DSR?",
    resposta:
      "Quem recebe horas extras habitualmente também tem direito a receber esse valor refletido no descanso semanal remunerado (folgas, domingos e feriados), proporcionalmente aos dias úteis do mês.",
  },
  {
    pergunta: "220h é sempre a jornada mensal certa?",
    resposta:
      "220h é o padrão para jornada de 44h semanais (a mais comum), mas sua convenção coletiva ou contrato pode prever jornada diferente. Ajuste o campo se for o seu caso.",
  },
];

export default function HorasExtrasPage() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/horas-extras" })} />
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
