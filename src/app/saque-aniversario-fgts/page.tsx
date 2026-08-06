import type { Metadata } from "next";
import { CalculadoraSaqueAniversario } from "@/components/calc/CalculadoraSaqueAniversario";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Saque-Aniversário vs. Saque-Rescisão do FGTS — Calculadora do Trabalhador",
  description:
    "Compare quanto você recebe por ano no saque-aniversário e quanto abre mão de sacar em uma eventual demissão sem justa causa.",
};

const PERGUNTAS = [
  {
    pergunta: "Posso voltar para o saque-rescisão depois de escolher o aniversário?",
    resposta:
      "Sim, mas não é imediato: é preciso solicitar a mudança e aguardar 2 meses de carência antes que ela valha, e você continua sem acesso ao saldo integral durante esse período em caso de demissão.",
  },
  {
    pergunta: "A multa de 40% também é afetada pela escolha?",
    resposta:
      "Não — a multa de 40% é sempre paga em dinheiro na demissão sem justa causa, independentemente da modalidade escolhida. A diferença está apenas no acesso ao saldo principal do FGTS.",
  },
  {
    pergunta: "Quando o saque-aniversário costuma valer mais a pena?",
    resposta:
      "Para quem tem estabilidade no emprego e quer complementar a renda todo ano sem depender de uma demissão. Para quem valoriza ter acesso rápido ao saldo total em caso de perda do emprego, o saque-rescisão tende a ser mais seguro.",
  },
];

export default function SaqueAniversarioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="FGTS"
          titulo="Saque-aniversário ou saque-rescisão: qual escolher?"
          descricao="Informe o saldo do seu FGTS para comparar o que cada modalidade oferece hoje e no caso de uma demissão sem justa causa."
        />
        <CalculadoraSaqueAniversario />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre o saque-aniversário" />
        <OutrasCalculadoras atual="/saque-aniversario-fgts" />
      </main>
      <SiteFooter />
    </>
  );
}
