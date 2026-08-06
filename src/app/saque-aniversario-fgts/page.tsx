import type { Metadata } from "next";
import { CalculadoraSaqueAniversario } from "@/components/calc/CalculadoraSaqueAniversario";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora Saque-Aniversário FGTS";
const DESCRICAO =
  "Calcule o saque-aniversário do FGTS e compare com o saque-rescisão: veja quanto você recebe por ano e quanto abre mão de sacar numa demissão sem justa causa.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/saque-aniversario-fgts",
});

const PERGUNTAS = [
  {
    pergunta: "Como calcular o saque-aniversário do FGTS?",
    resposta:
      "Aplica-se um percentual sobre o saldo total (de 5% a 50%, decrescente conforme o saldo aumenta) mais uma parcela fixa adicional nas faixas intermediárias. Esta calculadora já aplica as faixas oficiais da Lei 13.932/2019 a partir do saldo que você informar.",
  },
  {
    pergunta: "Posso voltar para o saque-rescisão depois de escolher o aniversário?",
    resposta:
      "Sim, mas não é imediato: é preciso solicitar a mudança e aguardar 2 meses de carência antes que ela valha, e você continua sem acesso ao saldo integral durante esse período em caso de demissão.",
  },
  {
    pergunta: "A multa de 40% também é afetada pela escolha?",
    resposta:
      "Não. A multa de 40% é sempre paga em dinheiro na demissão sem justa causa, independentemente da modalidade escolhida. A diferença está apenas no acesso ao saldo principal do FGTS.",
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
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd
        data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/saque-aniversario-fgts" })}
      />
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
